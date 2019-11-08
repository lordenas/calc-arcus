<template>
    <v-app id="inspire">
        <v-content>
            <v-container
              fluid
              style="max-width: 900px"
            >
                <div class="headline mb-5 mt-5 text-center">Выберите тип организации</div>
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-col
                        cols="12"
                        sm="8"
                        md="6"
                    >
                        <v-hover>
                            <template v-slot="{ hover }">
                                <v-card
                                    @click="form.active = 1"
                                    class="mx-auto c-point active"
                                    max-width="344"
                                    :dark="form.active == 1"
                                    :color="form.active == 1 ? '#388E3C' : '#FFF'"
                                    height="200"
                                    :elevation="hover ? 24 : 6"
                                >
                                    <v-card-text>
                                <!--  <div>Товарищество собственников жилья</div> -->
                                <div class="d-flex justify-space-between">
                                    <p class="title " :class="form.active == 1 ? 'text--white' : 'text--primary'">
                                        <span>ТСЖ / ЖСК</span>
                                    </p>
                                    <div class="title-icon">
                                        <v-icon >{{ form.active == 1 ? 'check_box' : 'check_box_outline_blank' }}</v-icon>
                                    </div>
                                </div>
                                <!--  <p>adjective</p> -->
                                    <div>
                                        Товарищество собственников жилья или<br>
                                        Жилищно-строительный кооператив
                                    </div>
                                    </v-card-text>
                                </v-card>
                            </template>
                        </v-hover>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="8"
                        md="6"
                    >
                    <v-hover>
                        <template v-slot="{ hover }">
                            <v-card
                                @click="form.active = 2"
                                class="mx-auto c-point relative"
                                style="overflow: hidden"
                                max-width="344"
                                height="200"
                                :dark="form.active == 2"
                                :color="form.active == 2 ? '#388E3C' : '#FFF'"
                                :elevation="hover ? 24 : 6"
                            >
                                <v-card-text class="relative" style="z-index: 5">
                                <!-- <div>Ресурсоснабжающая организация</div> -->
                                <div class="d-flex justify-space-between">
                                    <p class="title" :class="form.active == 2 ? 'text--white' : 'text--primary'">
                                        УК / РСО
                                    </p>
                                    <div class="title-icon">
                                        <v-icon >{{ form.active == 2 ? 'check_box' : 'check_box_outline_blank' }}</v-icon>
                                    </div>
                                </div>
                                <!-- <p>adjective</p> -->
                                <div>
                                    Управляющая компания или <br>
                                    Ресурсоснабжающая организация
                                </div>
                                </v-card-text>
                                <div class="block-icon">
                                    <v-icon >location_city</v-icon>
                                </div>
                            </v-card>
                            </template>
                        </v-hover>
                    </v-col>
                </v-row>

                <div class="headline mb-5 mt-5 pt-5 text-center">Заполните данные по организации</div>

                <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >
                    <v-row
                        align="center"
                        justify="center"
                    >
                        <v-col
                            cols="12"
                            sm="10"
                            md="6"
                        >
                                <v-text-field
                                    v-model="form.houseCount"
                                    :rules="minRequere"
                                    label="Количество домов на обслуживании"
                                    required
                                >
                                </v-text-field>

                                <v-text-field
                                    v-model="form.houseArea"
                                    :rules="minRequere"
                                    label="Общая площадь домов м2"
                                    required
                                    oninput="this.value = (()=>{
                                        const f = x => ( (x.toString().includes('.')) ? (x.toString().split('.').pop().length) : (0) );
                                        this.value = this.value.replace(',','.').replace(/^\.|[^\d\.]|\.(?=.*\.)|^0+(?=\d)/g, '').toLocaleString('ru')

                                        return Number(this.value.replace(',','.').replace(/^\.|[^\d\.]|\.(?=.*\.)|^0+(?=\d)/g, '')).toLocaleString('ru').replace(',','.')
                                    })()"
                                >
                                </v-text-field>

                                <v-text-field
                                    v-model="form.countComp"
                                    :rules="minRequere"
                                    label="Количество компьютеров организации"
                                    required
                                >
                                </v-text-field>
                                <v-row
                                    align="center"
                                    justify="center"
                                >
                                    <v-btn
                                        :disabled="!valid"
                                        color="success"
                                        class="mr-4"
                                        @click="validate"
                                    >
                                        Далее
                                    </v-btn> 
                                </v-row>
                        </v-col>
                        
                    </v-row>

                </v-form>


            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        data() {
            return {
                valid: true,
                form: {
                    houseCount: 1,
                    houseArea: 1000,
                    countComp: 1,
                    active: 1,
                },
                minRequere: [
                    v => !!v || 'Заполните это поле',
                    v => !!v && v > 0 || 'Поле должно быть больше 0',
                ],
            }
        },
        methods: {
            validate () {
                if (this.$refs.form.validate()) {
                    this.$router.push({
                        name: 'step2',
                        params: {
                            data: this.form
                        }
                    })
                }
            },

        }
    }
</script>

<style scoped>
    .theme--dark.v-card > .v-card__text, .theme--dark.v-card .v-card__subtitle{
        color: #FFF !important;
    }
    
    .block-icon i {
        font-size: 249px;
        position: absolute;
        right: -43px;
        top: 33px;
        color:rgba(0, 0, 0, 0.13);
        z-index: 1;
    }

</style>