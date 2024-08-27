for size in 48 60 72 76 96 120 128 144 152 180 192 256 512; do
    inkscape flame.svg --export-type="png" --export-filename=flame-${size}x${size}.png --export-width=${size} --export-height=${size} &
    inkscape flame-gradient.svg --export-type="png" --export-filename=flame-gradient-${size}x${size}.png --export-width=${size} --export-height=${size} &
done

#for size in 48 72 96 128 144 192 256 512; do
##    convert -quality 100 -resize ${size}x${size} flame-gradient.svg icon-${size}x${size}.png
#    inkscape flame-gradient.svg --export-type="png" --export-filename=flame-gradient-${size}x${size}.png --export-width=${size} --export-height=${size}
#done
