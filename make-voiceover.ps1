# OPTIONAL: creates one AI voice-over MP3 per scene (exact script text, nothing added).
# Needs Python + internet on YOUR PC. The voice comes from Microsoft's online TTS via the edge-tts tool -
# check its terms yourself before publishing. Or skip this and record/upload your own voice instead.
#   pip install edge-tts
#   edge-tts --list-voices     (look for en-IN voices; change $voice below if one is missing)
$ErrorActionPreference = "Stop"
$project = "C:\my-video"
$voice = "en-IN-NeerjaNeural"      # alternative: en-IN-PrabhatNeural
$rate  = "-6%"                      # a little slower than default = natural, not rushed
$out = "$project\public\aquaresq\audio\vo"
New-Item -ItemType Directory -Force $out | Out-Null

Get-ChildItem "$project\aquaresq-narration\scenes\scene*.txt" | ForEach-Object {
  $id = $_.BaseName
  edge-tts --voice $voice "--rate=$rate" --file $_.FullName --write-media "$out\$id.mp3"
  Write-Host "made $id.mp3"
}

# Print each clip length (needs ffprobe). Every clip must be shorter than its scene (see README table).
if (Get-Command ffprobe -ErrorAction SilentlyContinue) {
  Get-ChildItem "$out\scene*.mp3" | ForEach-Object {
    $s = ffprobe -v error -show_entries format=duration -of csv=p=0 $_.FullName
    "{0}: {1:N1} s" -f $_.BaseName, [double]$s
  }
}
Write-Host "Now set  voiceover: true  in src\aquaresq\data\timeline.ts" -ForegroundColor Green
