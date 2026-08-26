# Local preview server for this site.
# In VS Code: Terminal -> New Terminal, then run:  .\serve.ps1
# Open http://127.0.0.1:8765/  (not the file:// path).
# Stop with Ctrl+C.

$root = $PSScriptRoot
$prefix = "http://127.0.0.1:8765/"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)

try {
  $listener.Start()
} catch {
  Write-Output "Could not start. Is something else using port 8765?"
  Write-Output $_
  exit 1
}

Write-Output "Serving $root"
Write-Output "Open $prefix"
Write-Output "Stop with Ctrl+C"

try {
  while ($listener.IsListening) {
    $ctx = $listener.GetContext()
    $path = [Uri]::UnescapeDataString($ctx.Request.Url.LocalPath)
    if ($path -eq "/") { $path = "/index.html" }

    $full = Join-Path $root ($path.TrimStart("/").Replace("/", "\"))

    if (Test-Path -LiteralPath $full -PathType Leaf) {
      $ext = [IO.Path]::GetExtension($full).ToLowerInvariant()
      $ctype = switch ($ext) {
        ".html" { "text/html; charset=utf-8" }
        ".css"  { "text/css; charset=utf-8" }
        ".js"   { "text/javascript; charset=utf-8" }
        ".jpg"  { "image/jpeg" }
        ".jpeg" { "image/jpeg" }
        ".png"  { "image/png" }
        ".gif"  { "image/gif" }
        ".svg"  { "image/svg+xml" }
        ".webp" { "image/webp" }
        ".mp3"  { "audio/mpeg" }
        ".mp4"  { "video/mp4" }
        ".ico"  { "image/x-icon" }
        default { "application/octet-stream" }
      }

      $bytes = [IO.File]::ReadAllBytes($full)
      $ctx.Response.StatusCode = 200
      $ctx.Response.ContentType = $ctype
      $ctx.Response.Headers.Add("Cache-Control", "no-store")
      $ctx.Response.ContentLength64 = $bytes.Length
      $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
      $msg = [Text.Encoding]::UTF8.GetBytes("Not found")
      $ctx.Response.StatusCode = 404
      $ctx.Response.ContentType = "text/plain; charset=utf-8"
      $ctx.Response.ContentLength64 = $msg.Length
      $ctx.Response.OutputStream.Write($msg, 0, $msg.Length)
    }

    $ctx.Response.Close()
  }
} finally {
  $listener.Stop()
}
