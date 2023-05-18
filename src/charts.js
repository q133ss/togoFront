import {getDynamicsChart} from "@/helper";

export function dynamicRub() {

    getDynamicsChart('d', 'things').then((data) => {
        let orders = data.data.orders;
        let ordersValues = Object.values(orders); //значения
        let dates = Object.keys(orders); //дата

        let sales = data.data.sales;
        let salesValues = Object.values(sales);

        var dataFirst = {
            label: "Заказы",
            data: ordersValues,
            lineTension: 0,
            fill: false,
            borderColor: 'red'
        };

        var speedCanvas = document.getElementById("speedChart");

        var dataSecond = {
            label: "Продажи",
            data: salesValues,
            lineTension: 0,
            fill: false,
            borderColor: 'blue'
        };

        var timeData = {
            labels: dates,
            datasets: [dataFirst, dataSecond]
        };

        var chartOptions = {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    boxWidth: 80,
                    fontColor: 'black'
                }
            }
        };

        var lineChart = new Chart(speedCanvas, {
            type: 'line',
            data: timeData,
            options: chartOptions
        });
    });

}