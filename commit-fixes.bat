@echo off
echo Fazendo commit das correções...

git add .
git commit -m "fix: Corrigir fontes, tema admin e erro companies.map

- Aplicar tema CLARO no admin (branco/cinza) seguindo design do site
- Corrigir fontes para Inter igual à produção
- Corrigir erro 'companies.map is not a function' na página /admin/saas
- Adicionar funções loginAdmin e loginSaas no auth.ts
- Melhorar layout admin com sidebar, header e dashboard moderno
- Adicionar estados de loading e empty state
- Aplicar gradientes azul-cyan consistentes
- Adicionar tratamento de erro para API response format"

echo Commit realizado com sucesso!
pause

