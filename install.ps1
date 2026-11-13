# Copies the AquaResQ video into your EXISTING Remotion project. Nothing is deleted or reinstalled.
# Only new folders are created: src\aquaresq and public\aquaresq.
$ErrorActionPreference = "Stop"
$project = "C:\MY AI VIDEO EDITOR"
$here = Split-Path -Parent $PSScriptRoot

if (-not (Test-Path "$project\package.json")) { throw "C:\my-video\package.json not found - is the project path right?" }

New-Item -ItemType Directory -Force "$project\src\aquaresq" | Out-Null
New-Item -ItemType Directory -Force "$project\public\aquaresq" | Out-Null
Copy-Item "$here\src\aquaresq\*" "$project\src\aquaresq" -Recurse -Force
Copy-Item "$here\public\aquaresq\*" "$project\public\aquaresq" -Recurse -Force
Copy-Item "$here\narration" "$project\aquaresq-narration" -Recurse -Force

Write-Host "Copied. Now add 2 lines to C:\my-video\src\Root.tsx (see README step 3)." -ForegroundColor Green
