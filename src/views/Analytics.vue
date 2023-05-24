<template>
  <div class="row">
    <div class="col-sm-6 mb-4 mb-xl-0">
      <div class="d-lg-flex align-items-center">
        <div>
          <h3 class="text-dark font-weight-bold mb-2">Аналитика по товарам</h3>
          <!--          Тут будем делать text-danger, если не все данные подгруженны-->
          <div class="d-flex">
            <h6 class="font-weight-normal mb-2" style="margin-top: 2px;">Последнее обновление: {{lastUpdate}}</h6>
            <!--          Not Actual Data-->
            <div v-show="!isActualData">
              <a class="" id="messageDropdown" href="#" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="mdi mdi-alert-outline mx-0"></i>
              </a>
              <div class="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="messageDropdown">
                <p class="mb-0 font-weight-normal float-left dropdown-header">
                  Данные не актуальны
                </p>
              </div>
            </div>
          </div>
          <!--          <h6 class="font-weight-normal mb-2">Следующие обновление: 2020-04-02</h6>-->
          <button v-if="initData" class="btn btn-outline-primary" v-on:click="updateNow">Обновить сейчас</button>
          <button v-else class="btn btn-outline-primary" v-on:click="loadInitData">Загрузить данные</button>
        </div>
        <!--        <div class="ms-lg-5 d-lg-flex d-none">-->
        <!--          <button type="button" class="btn bg-white btn-icon">-->
        <!--            <i class="mdi mdi-view-grid text-success"></i>-->
        <!--          </button>-->
        <!--          <button type="button" class="btn bg-white btn-icon ms-2">-->
        <!--            <i class="mdi mdi-format-list-bulleted font-weight-bold text-primary"></i>-->
        <!--          </button>-->
        <!--        </div>-->
      </div>
    </div>
    <div class="col-sm-6">
      <div class="d-flex align-items-center justify-content-md-end">
        <div class="pe-1 mb-3 mb-xl-0">
          <label class="form-check-label">
            <input type="radio" class="form-check-input" v-on:click="changePeriod('yesterday')" name="ExampleRadio1" id="ExampleRadio1" :checked="day == true">
            Вчерашний день
            <i class="input-helper"></i></label>
        </div>
        <div class="pe-1 mb-3 mb-xl-0">
          <label class="form-check-label">
            <input type="radio" class="form-check-input" v-on:click="changePeriod('week')" name="ExampleRadio1" id="ExampleRadio1" :checked="week == true">
            Текущая неделя
            <i class="input-helper"></i></label>
        </div>
        <div class="pe-1 mb-3 mb-xl-0">
          <label class="form-check-label">
            <input type="radio" class="form-check-input" v-on:click="changePeriod('month')" name="ExampleRadio1" id="ExampleRadio1" :checked="month == true">
            Текущий месяц
            <i class="input-helper"></i></label>
        </div>
        <div class="pe-1 mb-3 mb-xl-0">
          <label class="form-check-label">
            <input type="radio" class="form-check-input" v-on:click="changePeriod('year')" name="ExampleRadio1" id="ExampleRadio1" :checked="year == true">
            Текущий год
            <i class="input-helper"></i></label>
        </div>
      </div>
      <div class="d-flex align-items-center justify-content-md-end mt-4">
        <div class="col-sm-3 d-flex">
          <label for="" class="" style="margin-right: 10px">От</label>
          <input class="form-control" type="date" placeholder="dd/mm/yyyy" v-model="dateFrom" style="height: 25px; padding: 0;">
        </div>
        <div class="col-sm-3 d-flex" style="margin-left: 20px;">
          <label for="" class="" style="margin-right: 10px">До</label>
          <input class="form-control" type="date" placeholder="dd/mm/yyyy" v-model="dateTo" style="height: 25px; padding: 0;">
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-4">
    <div class="col-sm-12 flex-column d-flex stretch-card">
      <div class="row">
        <div class="col-lg-4 d-flex grid-margin stretch-card">
          <div class="card sale-diffrence-border">
            <div class="card-body">
              <!--              <i class="mdi mdi-alert-circle-outline"></i>-->
              <h2 class="text-dark mb-2 font-weight-bold">{{revenue ?? 'Данные отсутствуют'}}</h2>
              <h4 class="card-title mb-2">Орг. выручка</h4>
              <small class="text-muted">APRIL 2019</small>
            </div>
          </div>
        </div>

        <div class="col-lg-4 d-flex grid-margin stretch-card">
          <div class="card sale-diffrence-border">
            <div class="card-body">
              <!--              <i class="mdi mdi-alert-circle-outline"></i>-->
              <h2 class="text-dark mb-2 font-weight-bold">{{orders ?? 'Данные отсутствуют'}}</h2>
              <h4 class="card-title mb-2">Заказы</h4>
              <small class="text-muted">APRIL 2019</small>
            </div>
          </div>
        </div>

        <div class="col-lg-4 d-flex grid-margin stretch-card">
          <div class="card sale-diffrence-border">
            <div class="card-body">
              <!--              <i class="mdi mdi-alert-circle-outline"></i>-->
              <h2 class="text-dark mb-2 font-weight-bold">{{margin ?? 'Данные отсутствуют'}}</h2>
              <h4 class="card-title mb-2">Маржа</h4>
              <small class="text-muted">APRIL 2019</small>
            </div>
          </div>
        </div>

        <div class="col-lg-4 d-flex grid-margin stretch-card">
          <div class="card sale-diffrence-border">
            <div class="card-body">
              <!--              <i class="mdi mdi-alert-circle-outline"></i>-->
              <h2 class="text-dark mb-2 font-weight-bold">{{leftovers ?? 'Данные отсутствуют'}}</h2>
              <h4 class="card-title mb-2">Остаток на WB</h4>
              <small class="text-muted">APRIL 2019</small>
            </div>
          </div>
        </div>

        <div class="col-lg-4 d-flex grid-margin stretch-card">
          <div class="card sale-diffrence-border">
            <div class="card-body">
              <!--              <i class="mdi mdi-alert-circle-outline"></i>-->
              <h2 class="text-dark mb-2 font-weight-bold">{{turnover ?? 'Данные отсутствуют'}}</h2>
              <h4 class="card-title mb-2">Оборачиваемость</h4>
              <small class="text-muted">APRIL 2019</small>
            </div>
          </div>
        </div>

        <div class="col-lg-4 d-flex grid-margin stretch-card">
          <div class="card sale-diffrence-border">
            <div class="card-body">
              <!--              <i class="mdi mdi-alert-circle-outline"></i>-->
              <h2 class="text-dark mb-2 font-weight-bold">{{revenueForecast ?? 'Данные отсутствуют'}}</h2>
              <h4 class="card-title mb-2">Прогноз выручки</h4>
              <small class="text-muted">APRIL 2019</small>
            </div>
          </div>
        </div>


        <div class="col-lg-4 d-flex grid-margin stretch-card">
          <div class="card sale-diffrence-border">
            <div class="card-body">
              <!--              <i class="mdi mdi-alert-circle-outline"></i>-->
              <h2 class="text-dark mb-2 font-weight-bold">---</h2>
              <h4 class="card-title mb-2">Самовыкпы</h4>
              <small class="text-muted">APRIL 2019</small>
            </div>
          </div>
        </div>

        <div class="col-lg-4 d-flex grid-margin stretch-card">
          <div class="card sale-diffrence-border">
            <div class="card-body">
              <!--              <i class="mdi mdi-alert-circle-outline"></i>-->
              <h2 class="text-dark mb-2 font-weight-bold">{{cancels ?? 'Данные отсутствуют'}}</h2>
              <h4 class="card-title mb-2">Отмены</h4>
              <small class="text-muted">APRIL 2019</small>
            </div>
          </div>
        </div>

        <div class="col-lg-4 d-flex grid-margin stretch-card">
          <div class="card sale-diffrence-border">
            <div class="card-body">
              <!--              <i class="mdi mdi-alert-circle-outline"></i>-->
              <h2 class="text-dark mb-2 font-weight-bold">---</h2>
              <h4 class="card-title mb-2">Реклама</h4>
              <small class="text-muted">APRIL 2019</small>
            </div>
          </div>
        </div>

        <div class="col-lg-4 d-flex grid-margin stretch-card">
          <div class="card sale-diffrence-border">
            <div class="card-body">
              <!--              <i class="mdi mdi-alert-circle-outline"></i>-->
              <h2 class="text-dark mb-2 font-weight-bold">{{returns ?? 'Данные отсутствуют'}}</h2>
              <h4 class="card-title mb-2">Возвраты</h4>
              <small class="text-muted">APRIL 2019</small>
            </div>
          </div>
        </div>

        <div class="col-lg-4 d-flex grid-margin stretch-card">
          <div class="card sale-diffrence-border">
            <div class="card-body">
              <!--              <i class="mdi mdi-alert-circle-outline"></i>-->
              <h2 class="text-dark mb-2 font-weight-bold">{{ransomPercentage ?? 'Данные отсутствуют'}}</h2>
              <h4 class="card-title mb-2">% выкупа</h4>
              <small class="text-muted">APRIL 2019</small>
            </div>
          </div>
        </div>

        <div class="col-lg-4 d-flex grid-margin stretch-card">
          <div class="card sale-diffrence-border">
            <div class="card-body">
              <!--              <i class="mdi mdi-alert-circle-outline"></i>-->
              <h2 class="text-dark mb-2 font-weight-bold">{{logisticsPercent ?? 'Данные отсутствуют'}}</h2>
              <h4 class="card-title mb-2">Логистика %</h4>
              <small class="text-muted">APRIL 2019</small>
            </div>
          </div>
        </div>

        <div class="col-lg-4 d-flex grid-margin stretch-card">
          <div class="card sale-diffrence-border">
            <div class="card-body">
              <!--              <i class="mdi mdi-alert-circle-outline"></i>-->
              <h2 class="text-dark mb-2 font-weight-bold">{{comissionPercent ?? 'Данные отсутствуют'}}</h2>
              <h4 class="card-title mb-2">Комиссия %</h4>
              <small class="text-muted">APRIL 2019</small>
            </div>
          </div>
        </div>
<!--        Logistics %-->
<!--        Commission %-->
      </div>

      <!--      Таблица-->
      <div class="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h4 class="card-title">Распределение маржинальной прибыли</h4>
              <div class="table-responsive">
                <table class="table">
                  <thead>
                  <tr>
                    <th>Артикул</th>
                    <th>Заказы</th>
                    <th>Орг Выручка</th>
                    <th>Маржа</th>
                    <th>К опалате</th>
                    <th>Реклама</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>---</td>
                    <td>---</td>
                    <td>---</td>
                    <td>----</td>
                    <td>----</td>
                    <td>----</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--      Склады-->


            <div class="row">

              <div class="col-sm-6 grid-margin d-flex stretch-card">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between">
                      <h4 class="card-title mb-2">Распределение остатков по складам, %</h4>
                    </div>
                    <canvas id="warehouses" width="1000" height="400"></canvas>
                  </div>
                </div>
              </div>

              <div class="col-sm-6 grid-margin d-flex stretch-card">
                <div class="card">
                  <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between">
                      <h4 class="card-title mb-2">Распределение продаж по складам, %</h4>
                    </div>
                    <canvas id="warehouseSales" width="1000" height="400"></canvas>
                  </div>
                </div>
              </div>
            </div>


      <!--      Склады-->

      <!--      Чарты-->
      <div class="row">

        <div class="col-sm-6 grid-margin d-flex stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <h4 class="card-title mb-2">Динамика развития, шт</h4>
              </div>
              <canvas id="speedChart" width="600" height="400"></canvas>
            </div>
          </div>
        </div>

        <div class="col-sm-6 grid-margin d-flex stretch-card">
          <div class="card">
            <div class="card-body">
              <div class="d-flex align-items-center justify-content-between">
                <h4 class="card-title mb-2">Динамика развития, руб</h4>
              </div>
              <canvas id="dynamicRub" width="600" height="400"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {changePeriod, getLastUpdate, getLkId, sendRequest, userInfo} from "@/helper";
import {dynamicThings, dynamicRub, warehouses, warehouseSales} from "@/charts";
export default {
  name: "Analytics",
    data() {
      return {
        initData: null,
        lastUpdate: null,
        isActualData: null,
        //даты
        day: false,
        month: false,
        week: false,
        year: false,
        dateFrom: null,
        dateTo: null,

        retailPriceWithdiscRub:null,
        spp: null,
        retailPriceWithdiscRubMinusSpp: null,
        revenue: null,
        turnover:null,
        orders: null,
        revenueForecast: null,
        leftovers: null,
        margin: null,
        returns: null,
        willList: null,
        ransomPercentage: null,
        logistics: null,
        commission: null,
        cancels: null,
        logisticsPercent: null,
        comissionPercent: null
      };
    },
    mounted() {
      function getDate(type){
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(type) == 0) {
            let resp = c.substring(type.length, c.length).slice(1);
            return resp;
          }
        }

        return false;
      }

      userInfo().then(data => {
        this.initData = data.data.user.init_data;
      });

      this.dateFrom = getDate('dateFrom');
      this.dateTo = getDate('dateTo');

      if(getLkId() !== 0) {
        getLastUpdate().then(data => {
          this.isActualData = data.data.isActual;
          this.lastUpdate = data.data.message;
        });

        sendRequest('/getFieldSumFromDetail/retail_price_withdisc_rub').then(data => {
          this.retailPriceWithdiscRub = data.data.total;
        });

        sendRequest('/spp').then(data => {
          this.spp = data.data.spp;
        });

        sendRequest('/retailPriceWithdiscRubMinusSpp').then(data => {
          this.retailPriceWithdiscRubMinusSpp = data.data.total;
        });

        sendRequest('/revenue').then(data => {
          this.revenue = data.data.revenue;
        });

        sendRequest('/orders').then(data => {
          this.orders = data.data.orders;
        });

        sendRequest('/turnover').then(data => {
          this.turnover = data.data.turnover;
        });

        sendRequest('/revenue/forecast').then(data => {
          this.revenueForecast = data.data.revenueForecast;
        });

        sendRequest('/leftovers').then(data => {
          this.leftovers = data.data.amount[0].total;
        });

        sendRequest('/margin').then(data => {
          this.margin = data.data.margin;
        });

        sendRequest('/returns').then(data => {
          this.returns = data.data.returns;
        });

        sendRequest('/will-list').then(data => {
          this.willList = data.data.willList;
        });

        sendRequest('/ransom/percentage').then(data => {
          this.ransomPercentage = data.data.ransomPercentage;
        });

        sendRequest('/logistics').then(data => {
          this.logistics = data.data.logistics;
        });

        // sendRequest('/sales').then(data => {
        //   this.sales = data.data.sales;
        // });
        //
        sendRequest('/commission').then(data => {
          this.commission = data.data.commission;
        });

        sendRequest('/cancels').then(data => {
          this.cancels = data.data.cancels;
        });

        sendRequest('/logistics/percent').then(data => {
          this.logisticsPercent = data.data.logisticsPercent;
        });

        sendRequest('/commission/percent').then(data => {
          this.comissionPercent = data.data.commissionPercent;
        });

        //Charts
        warehouses();
        warehouseSales();
        dynamicThings();
        dynamicRub();
      }
    },
    watch: {
      dateFrom(newVal, oldVal) {
        document.cookie = "dateFrom=" + newVal;
      },
      dateTo(newVal, oldVal) {
        document.cookie = "dateTo=" + newVal;
      }
    },
    methods:{
      changePeriod: function (period){
        changePeriod(period);
        setTimeout(() => location.reload(), 1000);
      },
      updateNow: function (){
        sendRequest('/update-data');
      },
      loadInitData: function (){
        sendRequest('/load-primary-data');
      }
    }
}
</script>

<style scoped>

</style>