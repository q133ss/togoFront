import {getDynamicsChart, sendRequest} from "@/helper";

export function dynamicThings() {

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


export function dynamicRub(){
    getDynamicsChart('d', 'sum').then((data) => {
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

        var speedCanvas = document.getElementById("dynamicRub");

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

export function warehouses(){
    sendRequest('/charts/warehouse').then((data) => {
        let orders = data.data.warehouses;
        let labels = [];
        let dates = [];
        orders.forEach(item => {
            labels.push(item.warehouseName);
            dates.push(item.percentage);
            }
        );

        //chart
        var warehouses = document.getElementById("warehouses");

        var stocksData = {
            labels: labels,
            datasets: [
                {
                    data: dates,
                    backgroundColor: [
                        "#FF6384",
                        "#63FF84",
                        "#84FF63",
                        "#8463FF",
                        "#6384FF",
                        "#009900",
                        "#000033",
                        "#0000FF",
                        "#9900CC",
                        "#FF3399",
                        "#000099",
                        "#333399"
                    ]
                }]
        };

        var pieChart = new Chart(warehouses, {
            type: 'pie',
            data: stocksData
        });
    });
}

export function warehouseSales(){
    sendRequest('/charts/warehouse/sales').then((data) => {
        let orders = data.data.warehouses;
        let labels = [];
        let dates = [];
        orders.forEach(item => {
                labels.push(item.warehouseName);
                dates.push(item.sales_percentage);
            }
        );

        //chart
        var warehouses = document.getElementById("warehouseSales");

        var stocksData = {
            labels: labels,
            datasets: [
                {
                    data: dates,
                    backgroundColor: [
                        "#FF6384",
                        "#63FF84",
                        "#84FF63",
                        "#8463FF",
                        "#6384FF",
                        "#009900",
                        "#000033",
                        "#0000FF",
                        "#9900CC",
                        "#FF3399",
                        "#000099",
                        "#333399"
                    ]
                }]
        };

        var pieChart = new Chart(warehouses, {
            type: 'pie',
            data: stocksData
        });
    });
}