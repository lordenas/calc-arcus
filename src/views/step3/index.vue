<template>
    <v-app id="inspire2">
        <v-content style="position: relative; z-index: 4;">
            <v-container
              fluid
              style="max-width: 900px"
            >

                <v-row
                    class="align-lg-start align-center justify-center justify-lg-space-between"
                >
                <div class="row-line"></div>
                <div class="display-2 mb-5 mt-5 text-center">Вы можете</div>
                <div class="row-line right-rope"></div>
                </v-row>
                <v-row
                    align="center"
                    justify="space-between"
                >
                    <v-col
                        cols="12"
                        sm="12"
                        md="6"
                        class="d-flex align-lg-start align-center justify-center justify-lg-center"
                    >
                        <div class="block-form">
                            <div class="title mb-5 mt-5 text-center">Распечатать расчет</div>
                            <v-row
                                align="start"
                                justify="center"
                            >
                                <v-btn
                                    :disabled="!valid"
                                    color="success"
                                    class="mr-4"
                                    @click="validate"
                                    outlined
                                >
                                        Распечатать
                                </v-btn>
                            </v-row>
                        </div>
                    </v-col>
                    <v-col
                        cols="12"
                        sm="12"
                        md="6"
                       class="d-flex align-lg-end align-center justify-center justify-lg-center"
                    >
                        <div class="block-form">
                            <div class="title mb-5 mt-5 text-center">Отправить расчет на почту</div>
                            <v-form
                                ref="formEmeil"
                                v-model="valid"
                                class="d-flex flex-column justify-space-between"
                                lazy-validation
                            >
                                <v-text-field
                                    v-model="formEmail.email"
                                    :rules="minRequere"
                                    label="Введите свой email"
                                    required
                                    solo
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
                                        outlined
                                    >
                                        Отправить
                                    </v-btn> 
                                </v-row>
                            </v-form>
                        </div>
                    </v-col>
                </v-row>

                <div class="title mb-5 mt-5 pt-5 text-center" style="margin-top: 60px !important;">А лучше оставьте номер телефона - мы вам перезвоним, ответим на любые вопросы и обсудим детали сотрудничества</div>

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
                                    v-model="form.name"
                                    :rules="minRequere"
                                    label="Имя"
                                    solo
                                    required
                                >
                                </v-text-field>

                                <v-text-field
                                    v-model="form.phone"
                                    :rules="minRequere"
                                    label="Телефон"
                                    required
                                    solo
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
                                        Позвоните мне
                                    </v-btn> 
                                </v-row>
                        </v-col>
                        
                    </v-row>

                </v-form>


            </v-container>
        </v-content>
        <div class="background-footer"></div>
    </v-app>
</template>

<script>
    export default {
        data() {
            return {
                valid: true,
                form: {
                    name: '',
                    phone: '',
                },
                formEmail: {
                    email: '',
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

    .block-form {
        display: flex;
        flex-direction: column;
        height: 200px;
        max-width: 300px;
        justify-content: flex-start;
    }

    .row-line {
        background-image: url('/rope.png');
        width: 300px;
        height: 135px;
        background-size: 105px;
        background-position: 170px 50px;
        opacity: 0.8;
    }
    .right-rope {
        transform: scale(-1, 1);
    }

    .background-footer {
        position: absolute;
        bottom: 0;
        background-image: url('/city.png');
        height: 600px;
        background-size: 100%;
        opacity: 0.2;
        z-index: 1;
        background-position-x: center;
        background-position-y: -150px;
        width: 1000px;
        margin: 0 auto;
        right: 0;
        left: 0;
    }


    @media (max-width: 900px) {
        .row-line {
            display: none;
        }

        .block-form {
            height: 150px;
        }
    }

</style>