# One-line upload to GitHub (Vercel and Render then redeploy by themselves).
# Use:   .\push.ps1 "what I changed"
param([string]$Message = "update")
Set-Location $PSScriptRoot
git add -A
git commit -m $Message
git push
