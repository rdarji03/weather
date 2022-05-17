let loc = document.querySelector(".head")
let icon = document.querySelector(".icn")
let temp = document.querySelector(".temp")
let climate = document.querySelector(".type")
const searchinp = document.querySelector(".inp_search")
const btn = document.querySelector(".inp_btn")

window.addEventListener("load", () => {
    let long;
    let lat;

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition((position) => {
            long = position.coords.longitude
            lat = position.coords.latitude
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=e76b75c300c1a5b2f857fc8bcf14f353
            `
            fetch(api).then((Response) => {
                    return Response.json();
                })
                .then(data => {

                    const { name } = data;
                    const { feels_like } = data.main;
                    const { id, main } = data.weather[0]


                    loc.textContent = name;
                    climate.textContent = main;
                    temp.textContent = Math.round(feels_like - 273);


                    if (id < 300 && id > 200) {
                        icon.src = "thunder.png"
                    }

                    if (id < 400 && id > 300) {
                        icon.src = "/img/drizzle.png"
                    }
                    if (id < 500 && id > 400) {
                        icon.src = "/img/rain.png"
                    }
                    if (id < 600 && id > 500) {
                        icon.src = "/img/snow.png"
                    }

                    if (id == 800) {
                        icon.src = "/img/sun.png"
                    }
                })
        })


    }
})


btn.addEventListener('click', (e) => {

    e.preventDefault()
    getwether(searchinp.value);
    searchinp.value = ""
})

const getwether = async(city) => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e76b75c300c1a5b2f857fc8bcf14f353`)



        const wdata = await response.json();
        console.log(wdata)

        const { name } = wdata;

        const { feels_like } = wdata.main;
        const { id, main } = wdata.weather[0]


        loc.textContent = name;
        climate.textContent = main;
        temp.textContent = Math.round(feels_like - 273);


        if (id < 300 && id > 200) {
            icon.src = "thunder.png"
        }

        if (id < 400 && id > 300) {
            icon.src = "/img/drizzle.png"
        }
        if (id < 500 && id > 400) {
            icon.src = "/img/rain.png"
        }
        if (id < 600 && id > 500) {
            icon.src = "/img/snow.png"
        }

        if (id == 800) {
            icon.src = "/img/sun.png"
        }

    } catch (error) {
        alert("city not found")
    }
}