    const map = document.querySelector('.map');
    const container = document.querySelector('.container');

    const rows = 10;
    const cols = 10;
    const ordo_top_end = (rows * cols) / 2;
    const ordo_bottom_end = (rows * cols) / 2 + cols;

    var cnt = 1;
    var axis_left = cols / 2;
    var ordo_top = (rows * cols) / 2 - cols + 1;
    var ordo_bottom = (rows * cols) / 2 + 1;

    container.style.width = `${cols * 5}rem`;

    console.log('ordo_top', ordo_top);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const area = document.createElement('div');
            area.classList.add('area');
            area.classList.add('grass');

            if (cnt === axis_left || cnt === axis_left + 1) {
                area.classList.remove('grass');

                if (cnt === axis_left + 1) {
                    axis_left += cols;
                }
            }
            if (cnt === ordo_top || cnt === ordo_bottom) {
                area.classList.remove('grass');
                ordo_top += ordo_top < ordo_top_end ? 1 : 0;

                if (cnt === ordo_bottom) {
                    ordo_bottom += ordo_bottom < ordo_bottom_end ? 1 : 0;
                }
            }
            area.innerText = cnt++;
            // console.log('i,j', i, j);
            map.appendChild(area);
        }
    }
