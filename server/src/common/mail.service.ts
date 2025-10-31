import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  /**
   * 📧 Método principal - Enviar email genérico via Brevo API
   */
  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    const brevoApiKey = process.env.BREVO_API_KEY;
    if (!brevoApiKey) {
      this.logger.error('[MAIL] BREVO_API_KEY não configurada');
      throw new InternalServerErrorException('Serviço de email não configurado');
    }

    try {
      this.logger.log(`[MAIL] Enviando email para ${to}`);
      
      const payload = {
        sender: {
          name: process.env.FROM_NAME || 'Portal SAAS Brasil',
          email: process.env.MAIL_FROM || 'noreply@portalsaasbrasil.com'
        },
        to: [
          {
            email: to,
            name: to.split('@')[0]
          }
        ],
        subject: subject,
        htmlContent: html,
        tags: ['password-reset', 'sistema']
      };
      
      this.logger.log(`[MAIL] Payload:`, JSON.stringify(payload, null, 2));

      const response = await axios.post(
        'https://api.brevo.com/v3/smtp/email',
        payload,
        {
          headers: {
            'api-key': brevoApiKey,
            'Content-Type': 'application/json'
          }
        }
      );

      this.logger.log(`[MAIL] Email enviado com sucesso - MessageID: ${response.data?.messageId}`);
    } catch (error) {
      this.logger.error(`[MAIL] Erro ao enviar email: ${error.message}`);
      this.logger.error(`[MAIL] Detalhes do erro:`, error.response?.data || error.response || error);
      throw new InternalServerErrorException('Erro ao enviar email');
    }
  }

  /**
   * 📧 Método específico - Enviar email de recuperação de senha
   */
  async sendPasswordResetEmail(email: string, token: string): Promise<void> {
    // Determinar URL base (produção ou desenvolvimento)
    const baseUrl = process.env.CLIENT_BASE_URL || process.env.CLIENT_URL || 'http://localhost:3001';
    const resetUrl = `${baseUrl}/saas/reset-password?token=${token}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #06b6d4 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          .warning { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Recuperação de Senha</h1>
          </div>
          <div class="content">
            <p>Olá,</p>
            <p>Recebemos uma solicitação para redefinir a senha da sua conta no <strong>Portal SAAS Brasil</strong>.</p>
            <p>Clique no botão abaixo para criar uma nova senha:</p>
            <p style="text-align: center;">
              <a href="${resetUrl}" class="button">Redefinir Senha</a>
            </p>
            <div class="warning">
              <strong>⚠️ Importante:</strong>
              <ul>
                <li>Este link expira em <strong>1 hora</strong></li>
                <li>Só pode ser usado <strong>uma vez</strong></li>
                <li>Se você não solicitou esta recuperação, ignore este email</li>
              </ul>
            </div>
            <p>Ou copie e cole o link abaixo no seu navegador:</p>
            <p style="word-break: break-all; color: #2563eb; font-size: 12px;">${resetUrl}</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Portal SAAS Brasil - Todos os direitos reservados</p>
            <p>Este é um email automático, não responda.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    await this.sendEmail(email, 'Recuperação de Senha - Portal SAAS Brasil', html);
  }
}

