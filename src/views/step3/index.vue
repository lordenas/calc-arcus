<template>
    <v-app id="inspire2">
        <v-content style="position: relative; z-index: 4;">
            <v-container
              fluid
              style="max-width: 900px"
            >
                <div class="title mb-5 mt-5 pt-5 text-center" style="margin-top: 60px !important;">Для получения расчета оставьте свои контактные данные</div>
                <v-row
                    align="center"
                    justify="center"
                >
                    <v-col
                        cols="12"
                        sm="10"
                        md="8"
                    >
                        <v-form
                            ref="form"
                            v-model="validPrint"
                            lazy-validation
                        >
                            <v-text-field
                                v-model="form.nameOrg"
                                :rules="minRequere"
                                label="Наименование организации"
                                outlined
                            >
                            </v-text-field>
                        
                            <v-text-field
                                v-model="form.email"
                                :rules="email"
                                label="Email"
                                outlined
                            >
                            </v-text-field>

                            <v-text-field
                                v-model="form.phone"
                                :rules="phone"
                                label="Телефон"
                                v-mask="mask"
                                placeholder="+7"
                                outlined
                            >
                            </v-text-field>
                        </v-form>
                        <v-row
                            align="center"
                            justify="center"
                        >
                            <v-btn

                                color="success"
                                class="mr-4 mt-2"
                                @click="sendTellMy()"
                            >
                                Позвоните мне
                            </v-btn>
                            <v-btn
                         
                                color="success"
                                class="mr-4 mt-2"
                                @click="sendToEmail()"
                            >
                                Отправить на email
                            </v-btn> 
                            <v-btn
                                
                                color="success"
                                class="mr-4 mt-2"
                                @click="toPrint()"
                            >
                                Распечатать
                            </v-btn> 
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-content>
        <div class="background-footer"></div>
    </v-app>
</template>

<script>
    import { mask } from 'vue-the-mask'

    export default {
        data() {
            return {
                validTellMy: true,
                validPrint: true,
                validEmail: true,
                mask: '+7 ### ### ## ##',
                form: {
                    name: '',
                    nameOrg: '',
                    phone: '+7',
                    email: '',
                },
                formEmail: {
                    email: '',
                },
                minRequere: [
                    v => !!v || 'Заполните это поле',
                ],
                email: [
                    v => !!v || 'Заполните это поле',
                    v => /.+@.+\..+/.test(v) || 'Введите E-mail',
                ],
                phone: [
                    v => !!v || 'Заполните это поле',
                    v => /^((\+7|7|8)+([0-9]){10})$/.test(v.replace(/\s/g, '')) || 'Введите номер телефона',
                ],
            }
        },
        methods: {
            sendTellMy () {
                if (this.$refs.form.validate()) {
                    console.log('tell my')
                }
            },
            toPrint() {
                if (this.$refs.form.validate()) {
                    console.log('print')
                }
            },
            sendToEmail() {
                if (this.$refs.form.validate()) {
                    console.log('test send to email')
                }
            }

        },
        directives: {
            mask,
        },
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