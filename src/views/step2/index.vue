<template>
    <v-app id="inspire">
        <v-content>
            <v-container
              fluid
              style="max-width: 900px"
            >
                <div class="headline mb-2 mt-5 text-left">Единовременные затраты: <b>{{ sumOneTimeCosts }} руб.</b></div>
                <div  class="mb-5">* с помощью галочек вы можете отказаться от части услуг или добавить новые</div>
                <div v-for="(item, index) in oneTimeCosts" :key="index" class="calc-table">
                    <div class="calc-table-row">
                        <div class="calc-table-row-label title">
                            <template>{{ item.titleText }}</template>
                        </div>
                        <div class="calc-table-row-price title">
                            {{ calcSum(item.subCat, index) }}
                        </div>
                    </div>

                    <div class="calc-table-row" v-for="(item, subIndex) in item.subCat" :key="subIndex">
                        <div class="calc-table-row-label sub-title">
                            <v-checkbox
                                v-model="item.active"
                                v-if="!item.title"
                                class="checkbox-row"
                                style=""
                                color="primary"
                                :label="item.select ? '' : item.titleText"
                                @change="calcRemove(index, 'oneTimeCosts')"
                                :disabled="item.disabled"
                            ></v-checkbox>

                            <input 
                                v-model="item.inputCalc"
                                v-if="item.input"
                                :disabled="!item.active"
                                class="calc-table-input"
                                oninput="this.value = (()=>{
                                    const f = x => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) );
                                    this.value = this.value.replace(',','.').replace(/^\.|[^\d\.]|\.(?=.*\.)|^0+(?=\d)/g, '')

                                    if(/^(([1-9]\d*)|\d)(\.)?(\d{1,2})?$/.test(this.value)) {
                                        return this.value.replace(',','.').replace(/^\.|[^\d\.]|\.(?=.*\.)|^0+(?=\d)/g, '')
                                    }

                                    if(f(this.value) > 2) {
                                        return parseFloat(this.value.replace(',','.').replace(/^\.|[^\d\.]|\.(?=.*\.)|^0+(?=\d)/g, '')).toFixed(3).slice(0,-1)
                                    } else {
                                        return this.value.replace(',','.').replace(/^\.|[^\d\.]|\.(?=.*\.)|^0+(?=\d)/g, '')
                                    }
                                })()"
                                @input="()=>{
                                    formulaCalc(subIndex, index, item, 'oneTimeCosts')
                                    calcRemove(index, 'oneTimeCosts')
                                }"
                            />

                            <v-select
                                :items="item.selectItems"
                                v-if="item.select"
                                class="calc-table-select"
                                dense
                                v-model="item.activeSelect"
                                item-value="value"
                                item-text="title"
                                @change="()=>{
                                    changeSelect(index, subIndex, 'oneTimeCosts')
                                    calcRemove(index, 'oneTimeCosts')
                                }"
                            >
                            </v-select>

                        </div>
                        <div class="calc-table-row-price sub-title"  :style="item.active ? 'opacity: 1': 'opacity: 0.3'">
                            {{ Number(item.price.toFixed(0)).toLocaleString('ru') }}
                        </div>
                    </div>
                </div>


                <div class="headline mb-2 mt-5 pt-5 text-left">Ежемесячные затраты: <b>{{ sumMonthlyCosts }} руб.</b></div>
                <div class="mb-5">* с помощью галочек вы можете отказаться от части услуг или добавить новые</div>

                <div v-for="(item, index) in monthlyCosts" :key="index+'two'" class="calc-table">
                    <div class="calc-table-row">
                        <div class="calc-table-row-label title">
                            <template>{{ item.titleText }}</template>
                        </div>
                        <div class="calc-table-row-price title">
                            {{ calcSum(item.subCat, index) }}
                        </div>
                    </div>

                    <div class="calc-table-row" v-for="(item, subIndex) in item.subCat" :key="subIndex+'two'">
                        <div class="calc-table-row-label sub-title">
                            <v-checkbox
                                v-model="item.active"
                                v-if="!item.title"
                                class="checkbox-row"
                                color="primary"
                                :label="item.select ? '' : item.titleText"
                                @change="calcRemove(index, 'monthlyCosts')"
                            ></v-checkbox>

                            <input 
                                v-model="item.inputCalc"
                                v-if="item.input"
                                :disabled="!item.active"
                                class="calc-table-input"
                                @input="()=>{
                                    formulaCalc(subIndex, index, item, 'monthlyCosts')
                                    calcRemove(index, 'monthlyCosts')
                                }"
                            />


                            <v-select
                                :items="item.selectItems"
                                v-if="item.select"
                                class="calc-table-select"
                                dense
                                v-model="item.activeSelect"
                                item-value="value"
                                item-text="title"
                            ></v-select>
                            
                        </div>
                        <div class="calc-table-row-price sub-title" :style="item.active ? 'opacity: 1': 'opacity: 0.3'">
                            {{ Number(item.price.toFixed(0)).toLocaleString('ru') }}
                        </div>
                    </div>
                </div>
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-btn
                        :disabled="!valid"
                        color="grey"
                        dark
                        class="mr-4"
                        @click="()=>{
                            this.$router.push({
                                name: 'step1',
                            })
                        }"
                    >
                        Назад
                    </v-btn>
                    <v-btn
                        :disabled="!valid"
                        color="success"
                        class="mr-4"
                        @click="()=>{
                            this.$router.push({
                                name: 'step3',
                            })
                        }"
                    >
                        Далее
                    </v-btn>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import dataFile from '@/calcData/uk'
    import options from '@/calcData/options'

    export default {
        data() {
            return {
                active: 1,
                valid: true,
                checkbox: true,
                items: ['"1С: Бухгалтерия 8.3 Базовая версия"', '"1С: Бухгалтерия 8.3 ПРОФ"', ],

                oneTimeCosts: [],
                monthlyCosts: []
            }
        },
        mounted() {
            
            this.openStep()
        },
        computed: {
            sumOneTimeCosts() {
                let sum = this.oneTimeCosts.reduce((calc, item) => {
                    return item.price + calc
                }, 0)
                return Number(sum.toFixed(0)).toLocaleString('ru')
            },
            sumMonthlyCosts() {
                let sum = this.monthlyCosts.reduce((calc, item) => {
                    return item.price + calc
                }, 0)
                return Number(sum.toFixed(0)).toLocaleString('ru')
            },
        },
        methods: {
            validate () {
                if (this.$refs.form.validate()) {
                
                }
            },
            calcSum(array, index) {
                let sumActive = array.reduce((calc, item)=>{
                    return item.active ? item.price + calc : calc + 0
                }, 0)
                //this.oneTimeCosts[index].price = sumActive
                return Number(sumActive.toFixed(0)).toLocaleString('ru')
            },
            formulaCalc(subIndex, index, item, step) {
                let calc = eval(item.indFormula)
                this[step][index].subCat[subIndex].price = calc
            },
            calcRemove(index, data) {
                let sumActive =  this[data][index].subCat.reduce((calc, item)=>{
                    return item.active ? item.price + calc : calc + 0
                }, 0)
                this[data][index].price = sumActive
            },
            changeSelect(index, subIndex, step) {
                let activeSelect = this[step][index].subCat[subIndex].activeSelect

                console.log(this[step][index].subCat[subIndex])
                this[step][index].subCat[subIndex].price =  this[step][index].subCat[subIndex].selectItems[activeSelect].price
            },
            openStep() {
                let optionsData = options(this.$route.params.data)
                this.oneTimeCosts = optionsData.oneTimeCosts
                this.monthlyCosts = optionsData.monthlyCosts
                
                for(let i = 0; i < this.oneTimeCosts.length; i++) {
                     this.calcRemove(i, 'oneTimeCosts')
                }
               for(let i = 0; i < this.oneTimeCosts.length; i++) {
                     this.calcRemove(i, 'monthlyCosts')
                }
            }
        },
        watch: {
            '$route' (to) {
                console.log('to.path', to.path)
                if( to.path == '/step2') {
                    this.openStep()
                }
            }
        }
    }
</script>

<style lang="sass" scoped>
    .calc-table
        margin-bottom: 40px
        &-row
            display: flex
            justify-content: space-between
            padding: 7px 20px
            &:nth-child(odd)
                background: #DFDFDF
            &:nth-child(2n)
                background: #ECECEC
        &-input
            background-color: #FFF
            width: 60px
            margin: 0 20px
            padding: 2px 5px
            &:disabled
                opacity: 0.4
        &-select
            margin: -6px 20px
            padding: 2px 5px
            

    .calc-table-row .title
        font-size: 17px !important

    .sub-title
        margin-left: 30px

    .v-select__selection--comma
        color: rgb(102, 102, 102) !important

    .checkbox-row
        float: left
        padding: 0
        margin: 2px
        height: 0
        
    @media (max-width: 900px)
        .checkbox-row
            height: auto
        .sub-title
            margin-left: 5px
            max-width: 84%
</style>

<style>
    .v-select__selection--comma {
        color: rgb(102, 102, 102) !important;
    }
</style>