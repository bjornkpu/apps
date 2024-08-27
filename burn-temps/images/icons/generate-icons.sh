for size in 48 60 76 96 120 128 144 180 192 256 512; do
    inkscape flame.svg --export-type="png" --export-filename=flame-${size}x${size}.png --export-width=${size} --export-height=${size} &
    inkscape flame-gradient.svg --export-type="png" --export-filename=flame-gradient-${size}x${size}.png --export-width=${size} --export-height=${size} &
done

inkscape graph.svg --export-type="png" --export-filename=graph-96x96.png --export-width=96 --export-height=96 &
