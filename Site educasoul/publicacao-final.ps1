# Publicação final do site Educasoul: tira o noindex e o aviso "Protótipo para apresentação"
# de todas as páginas. Rodar só quando o domínio da cliente estiver apontado e o site aprovado.
# Pode rodar mais de uma vez: o que já foi removido é ignorado.

$site = Join-Path $PSScriptRoot 'site'
$utf8 = New-Object System.Text.UTF8Encoding($false)   # UTF-8 sem BOM, como os arquivos atuais
$remover = @(
  '<!-- prévia: tirar o noindex na publicação final -->'
  '<meta name="robots" content="noindex, nofollow">'
  '<span>Protótipo para apresentação · conteúdo ilustrativo</span>'
)

Get-ChildItem $site -Filter *.html | ForEach-Object {
  $texto = [IO.File]::ReadAllText($_.FullName, $utf8)
  $linhas = $texto -split "`n"
  $novas = $linhas | Where-Object { $remover -notcontains $_.Trim() }
  $tirou = $linhas.Count - @($novas).Count
  if ($tirou -gt 0) { [IO.File]::WriteAllText($_.FullName, ($novas -join "`n"), $utf8) }
  '{0,-22} {1} linha(s) removida(s)' -f $_.Name, $tirou
}

$sobrou = Select-String -Path (Join-Path $site '*.html') -Pattern 'noindex|Protótipo para apresentação' -Encoding utf8
if ($sobrou) { 'ATENÇÃO, ainda sobrou:'; $sobrou } else { 'OK: nenhuma página com noindex ou aviso de protótipo.' }
