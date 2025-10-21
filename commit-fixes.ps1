# Script PowerShell para fazer commit das correções
Write-Host "🚀 Fazendo commit das correções..." -ForegroundColor Green

try {
    # Adicionar todos os arquivos
    Write-Host "📁 Adicionando arquivos..." -ForegroundColor Yellow
    git add .
    
    # Fazer commit
    Write-Host "💾 Fazendo commit..." -ForegroundColor Yellow
    git commit -m "fix: Corrigir fontes, tema admin e erro companies.map

- Aplicar tema CLARO no admin (branco/cinza) seguindo design do site
- Corrigir fontes para Inter igual à produção
- Corrigir erro 'companies.map is not a function' na página /admin/saas
- Adicionar funções loginAdmin e loginSaas no auth.ts
- Melhorar layout admin com sidebar, header e dashboard moderno
- Adicionar estados de loading e empty state
- Aplicar gradientes azul-cyan consistentes
- Adicionar tratamento de erro para API response format"
    
    Write-Host "✅ Commit realizado com sucesso!" -ForegroundColor Green
} catch {
    Write-Host "❌ Erro ao fazer commit: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "Pressione qualquer tecla para continuar..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

