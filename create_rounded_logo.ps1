Add-Type -AssemblyName System.Drawing
$src = [System.Drawing.Image]::FromFile('c:\Apps Custom\Marketplace Farid\farid-shop-game\public\logo.jpeg')
$bmp = New-Object System.Drawing.Bitmap($src.Width, $src.Height)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.Clear([System.Drawing.Color]::Transparent)

$path = New-Object System.Drawing.Drawing2D.GraphicsPath
$radius = 128
$w = $src.Width
$h = $src.Height
$path.AddArc(0, 0, $radius, $radius, 180, 90)
$path.AddArc($w - $radius, 0, $radius, $radius, 270, 90)
$path.AddArc($w - $radius, $h - $radius, $radius, $radius, 0, 90)
$path.AddArc(0, $h - $radius, $radius, $radius, 90, 90)
$path.CloseFigure()

$g.SetClip($path)
$g.DrawImage($src, 0, 0, $w, $h)

$bmp.Save('c:\Apps Custom\Marketplace Farid\farid-shop-game\public\logo-rounded.png', [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()
$src.Dispose()
