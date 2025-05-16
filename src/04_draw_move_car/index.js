

const car_div = `
    <div class="car" id='car_id' data-area='area_id'>
        <div class="wheel lt-wheel"></div>
        <div class="wheel rt-wheel"></div>
        <div class="wheel lb-wheel"></div>
        <div class="wheel rb-wheel"></div>
    </div>`

const create_car = (id, area_id) => {
    const car = car_div
        .replaceAll('car_id', `car-${id}`)
        .replaceAll('area_id', area_id);

    return car;
}


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

            area.id = `area${cnt}`;
            area.classList.add('area');
            area.classList.add('grass');
            area.setAttribute('data-id', cnt);
            area.setAttribute('data-step', cols);
            area.setAttribute('data-x', j);
            area.setAttribute('data-y', i);

            if (cnt === axis_left || cnt === axis_left + 1) {
                area.classList.remove('grass');
                area.setAttribute('data-way', 'down');

                if (cnt === axis_left + 1) {
                    axis_left += cols;
                    area.setAttribute('data-way', 'up');
                }
            }

            if (cnt === ordo_top || cnt === ordo_bottom) {
                area.classList.remove('grass');
                area.setAttribute('data-way', 'left');
                ordo_top += ordo_top < ordo_top_end ? 1 : 0;

                if (cnt === ordo_bottom) {
                    area.setAttribute('data-way', 'right');
                    ordo_bottom += ordo_bottom < ordo_bottom_end ? 1 : 0;
                }
            }
            area.innerText = cnt++;
            // console.log('i,j', i, j);
            map.appendChild(area);
        }
    }
const area96 = document.getElementById('area96');
area96.insertAdjacentHTML('beforeend', create_car(1, area96.id));


const getAreaByXY = (x, y) => document.querySelector(`.area[data-x="${x}"][data-y="${y}"]`);

document.querySelector('.touchpad .fa-circle-arrow-left').addEventListener('click', function() {
    const car = document.getElementById('car-1');
    const car_area = document.getElementById(car.getAttribute('data-area'));
    const this_x = parseInt(car_area.getAttribute('data-x'));
    const this_y = parseInt(car_area.getAttribute('data-y'));
    const left_x = this_x - 1;

    if (left_x < 0) {
        console.log('Left boundary reached');
        return;
    }

    const left_area = getAreaByXY(left_x, this_y);

    if (left_area.classList.contains('grass')) {
        console.log('Left area is grass');
        return;
    } else {

        const left_area_way = left_area.getAttribute('data-way');

        if (left_area_way.split(',').includes('left')) {
            car.remove();
            left_area.insertAdjacentHTML('beforeend', create_car(1, left_area.id));
        }
    }
    console.log('Left arrow clicked', left_area.innerText);
});

document.querySelector('.touchpad .fa-circle-arrow-right').addEventListener('click', () => {
    // Add your logic here for right arrow click
    console.log('Right arrow clicked');
});

document.querySelector('.touchpad .fa-circle-arrow-up').addEventListener('click', () => {
    const car = document.getElementById('car-1');
    const car_area = document.getElementById(car.getAttribute('data-area'));
    const this_x = parseInt(car_area.getAttribute('data-x'));
    const this_y = parseInt(car_area.getAttribute('data-y'));
    const up_y = this_y - 1;

    if (up_y < 0) {
        console.log('Up boundary reached');
        return;
    }

    const up_area = getAreaByXY(this_x, up_y);

    if (up_area.classList.contains('grass')) {
        console.log('Up area is grass');
        return;
    } else {

        const up_area_way = up_area.getAttribute('data-way');
        console.log('up_area_way', up_area_way);

        if (up_area_way.split(',').includes('up')) {
            car.remove();
            up_area.insertAdjacentHTML('beforeend', create_car(1, up_area.id));
        }
    }

    // Add your logic here for up arrow click
    console.log('Up arrow clicked');
});

document.querySelector('.touchpad .fa-circle-arrow-down').addEventListener('click', () => {
    const car = document.getElementById('car-1');
    const car_area = document.getElementById(car.getAttribute('data-area'));
    const this_x = parseInt(car_area.getAttribute('data-x'));
    const this_y = parseInt(car_area.getAttribute('data-y'));
    const down_y = this_y + 1;

    if (down_y > rows) {
        console.log('Down boundary reached');
        return;
    }

    const down_area = getAreaByXY(this_x, down_y);

    if (down_area.classList.contains('grass')) {
        console.log('Down area is grass');
        return;
    } else {

        const down_area_way = down_area.getAttribute('data-way');

        console.log('down_area_way', down_area_way);
        if (down_area_way.split(',').includes('down')) {
            car.remove();
            down_area.insertAdjacentHTML('beforeend', create_car(1, down_area.id));
        }
    }
    // Add your logic here for down arrow click
    console.log('Down arrow clicked');
});