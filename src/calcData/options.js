import dataFileUK from '@/calcData/uk'
import dataFileTSG from '@/calcData/tsg'

export default function(data) {

	console.log('options', data)

	let config = {}
	let dsq = data.houseArea
	let countHouse = data.houseCount
	let countComp = data.countComp
	//единовременный затраты установка и внедрение на компьютеры компании
	switch (true) {
		case (dsq > 0 && dsq <=6500):
			config.dsqOneTimeCosts = 12000
			break;
		case (dsq > 6500 && dsq <=10000):
			config.dsqOneTimeCosts = 17000
			break;
		case (dsq > 10000 && dsq <=20000):
			config.dsqOneTimeCosts = 20000
			break;
		case (dsq > 20000 && dsq <=35000):
			config.dsqOneTimeCosts = 25000
			break;
		case (dsq > 35000 && dsq <=50000):
			config.dsqOneTimeCosts = 30000
			break;
		case (dsq > 50000 && dsq <=75000):
			config.dsqOneTimeCosts = 35000
			break;
		case (dsq > 75000 && dsq <=100000):
			config.dsqOneTimeCosts = 40000
			break;
		case (dsq > 100000 && dsq <=140000):
			config.dsqOneTimeCosts = 50000
			break;
		case (dsq > 140000):
			config.dsqOneTimeCosts = 65000
			break;
		default:
			config.dsqOneTimeCosts = 12000
			break;
	}

	//Ежемесячные затраты: техническая поддержка ПК АРКУС

	switch (true) {
		case (dsq > 0 && dsq <=6500):
			config.dsqMonthlyCosts = 900
			break;
		case (dsq > 6500 && dsq <=10000):
			config.dsqMonthlyCosts = 0.15 * dsq
			break;
		case (dsq > 10000 && dsq <=20000):
			config.dsqMonthlyCosts = 0.14 * dsq
			break;
		case (dsq > 20000 && dsq <=35000):
			config.dsqMonthlyCosts = 0.12 * dsq
			break;
		case (dsq > 35000 && dsq <=50000):
			config.dsqMonthlyCosts = 0.11 * dsq
			break;
		case (dsq > 50000 && dsq <=75000):
			config.dsqMonthlyCosts = 0.1 * dsq
			break;
		case (dsq > 75000 && dsq <=100000):
			config.dsqMonthlyCosts = 0.09 * dsq
			break;
		case (dsq > 100000 && dsq <=140000):
			config.dsqMonthlyCosts = 0.08 * dsq
			break;
		case (dsq > 140000):
			config.dsqMonthlyCosts = 0.07 * dsq
			break;
		default:
			config.dsqMonthlyCosts = 900
			break;
	}

	//Ежемесячные затраты: размещение информации в ГИС ЖКХ

	switch (true) {
		case (countHouse == 1):
			config.gis = 2000
			break;
		case (countHouse >= 2 && countHouse <= 5):
			config.gis = 1000 * countHouse
			break;
		case (countHouse >= 6 && countHouse <= 10):
			config.gis = 900 * countHouse
			break;
		case (countHouse >= 11 && countHouse <= 15):
			config.gis = 800 * countHouse
			break;
		case (countHouse >= 16 && countHouse <= 20):
			config.gis = 700 * countHouse
			break;
		case (countHouse >= 21 && countHouse <= 30):
			config.gis = 600 * countHouse
			break;
		case (countHouse > 30):
			config.gis = 500 * countHouse
			break;
		default:
			config.gis = 2000
			break;
	}

	//Ежемесячные затраты: обслуживание техники 

	switch (true) {
		case (countComp >= 1 && countComp <= 6):
			config.tehpom = 4200
			break;
		case (countComp > 6):
			config.tehpom = 700 * countComp
			break;
		default:
			config.tehPom = 4200
			break;
	}


	let configStep2 = data.active == 1 ? dataFileTSG : dataFileUK


	function testSubCutActivated(array, id, subId, subProp,  dataSubProps) {
		for(let item of array) {
			if(item.id == id) {
				if(item.subCat.length > 0) {
					for(let item of item.subCat) {
						if(item.id == subId) {
							item[subProp] = eval(dataSubProps)
						}
					}
				}
			}
		}
	}

	let arrayProps = configStep2.oneTimeCosts

	testSubCutActivated(arrayProps, 23, 24, 'price', config.dsqOneTimeCosts) // тсж площадь
	testSubCutActivated(arrayProps, 29, 30, 'inputCalc', countComp) // тсж кашепровский
	testSubCutActivated(arrayProps, 29, 30, 'price',  'Math.ceil(countComp / 2) * item.onePrice') // тсж кашепровский

	testSubCutActivated(arrayProps, 0, 1, 'price',  config.dsqOneTimeCosts) // ук площадь
	testSubCutActivated(arrayProps, 3, 5, 'active',  data.houseArea >=150000 || data.countComp >=15 ? true : false) // ук диспетчерезация
	testSubCutActivated(arrayProps, 6, 7, 'activeSelect',  data.houseArea >=100000 || data.countComp >=10 ? 1 : 0) // ук Бухгалтерский учет, в т.ч.
	testSubCutActivated(arrayProps, 6, 7, 'price', 'item.activeSelect == 0 ? 5400 : 13000') // ук Бухгалтерский учет, в т.ч.

	testSubCutActivated(arrayProps, 6, 8, 'active', data.houseArea < 70000 && data.countComp < 7 ? false : true) // ук Бухгалтерский учет, в т.ч.
	testSubCutActivated(arrayProps, 6, 8, 'activeSelect', data.houseArea > 300000 || data.countComp > 30 ? 1 : 0) // ук Бухгалтерский учет, в т.ч.
	testSubCutActivated(arrayProps, 6, 8, 'price',' item.activeSelect == 0 ?  8100 : 22600') // ук Бухгалтерский учет, в т.ч.
	
	testSubCutActivated(arrayProps, 10, 11, 'inputCalc', countComp) //ук кашепровский
	testSubCutActivated(arrayProps, 10, 11, 'price', 'Math.ceil(countComp / 2) * item.onePrice') //ук кашепровский


	//ежемесячные расходы
	let arrayPropsMoth = configStep2.monthlyCosts

	testSubCutActivated(arrayPropsMoth, 31, 32, 'price', config.dsqMonthlyCosts) //тсж техническая поддержка ПК АРКУС
	testSubCutActivated(arrayPropsMoth, 33, 34, 'price', config.gis)  //тсж гис
	testSubCutActivated(arrayPropsMoth, 37, 38, 'price', config.tehpom) //тсж тех. пом.

	testSubCutActivated(arrayPropsMoth, 12, 13, 'price', config.dsqMonthlyCosts) //ук техническая поддержка ПК АРКУС
	testSubCutActivated(arrayPropsMoth, 14, 15, 'price', config.gis) //ук гис
	testSubCutActivated(arrayPropsMoth, 14, 18, 'price', data.houseArea * 0.03 > 900 ?  data.houseArea * 0.03 : 900) //ук диспетчерезация
	testSubCutActivated(arrayPropsMoth, 14, 18, 'active', data.houseArea >=150000 || data.countComp >=15 ? true : false) //ук диспетчерезация

	testSubCutActivated(arrayPropsMoth, 19, 20, 'inputCalc',data.houseArea < 70000 && data.countComp < 7 ? 1 : 2) //ук диспетчерезация

	testSubCutActivated(arrayPropsMoth, 21, 22, 'price', config.tehpom) //ук  тех. пом.


	return configStep2

}