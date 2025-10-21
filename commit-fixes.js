const { execSync } = require('child_process');

console.log('🚀 Fazendo commit das correções...');

try {
  // Adicionar todos os arquivos
  execSync('git add .', { stdio: 'inherit' });
  
  // Fazer commit
  execSync(`git commit -m "fix: Corrigir fontes, tema admin e erro companies.map

- Aplicar tema CLARO no admin (branco/cinza) seguindo design do site
- Corrigir fontes para Inter igual à produção  
- Corrigir erro 'companies.map is not a function' na página /admin/saas
- Adicionar funções loginAdmin e loginSaas no auth.ts
- Melhorar layout admin com sidebar, header e dashboard moderno
- Adicionar estados de loading e empty state
- Aplicar gradientes azul-cyan consistentes
- Adicionar tratamento de erro para API response format"`, { stdio: 'inherit' });
  
  console.log('✅ Commit realizado com sucesso!');
} catch (error) {
  console.error('❌ Erro ao fazer commit:', error.message);
}

