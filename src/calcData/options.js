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

	for(let item of configStep2.oneTimeCosts) {
		if(item.id == 23) {
			item.subCat[0].price = config.dsqOneTimeCosts //тсж
		} else if(item.id == 29) {
			item.subCat[0].inputCalc = countComp //тсж кашепровский
			item.subCat[0].price = Math.ceil(countComp / 2) * item.onePrice  //тсж кашепровский
		} else if(item.id == 0) {
			//---------------------
			item.subCat[0].price = config.dsqOneTimeCosts // ук
		} else if(item.id == 3) {
			item.subCat[1].active = data.houseArea >=150000 || data.countComp >=15 ? true : false // ук диспетчерезация
		} else if(item.id == 6) {
			item.subCat[0].activeSelect = data.houseArea >=100000 || data.countComp >=10 ? 1 : 0 // ук
			item.subCat[0].activeSelect == 0 ? item.subCat[0].price = 5400 : 13000


			item.subCat[1].active = data.houseArea < 70000 && data.countComp < 7 ? false : true // ук
			item.subCat[1].activeSelect = data.houseArea > 300000 || data.countComp > 30 ? 1 : 0 // ук
		} else if(item.id == 10) {
			item.subCat[0].inputCalc = countComp //ук кашепровский
			item.subCat[0].price = Math.ceil(countComp / 2) * item.onePrice  //ук кашепровский
		}
	}


	for(let item of configStep2.monthlyCosts) {
		if(item.id == 31) {
			item.subCat[0].price = config.dsqMonthlyCosts //тсж техническая поддержка ПК АРКУС
		} else if(item.id == 33) {
			item.subCat[0].price = config.gis //тсж гис
		} else if(item.id == 37) {
			item.subCat[0].price = config.tehpom //тсж тех. пом.
		} else if(item.id == 12) {
			//---------------------
			item.subCat[0].price = config.dsqMonthlyCosts //ук техническая поддержка ПК АРКУС
		} else if(item.id == 14) {
			item.subCat[0].price = config.gis //ук гис
			item.subCat[3].price =  data.houseArea * 0.03 //ук диспетчерезация
			item.subCat[3].active = data.houseArea >=150000 || data.countComp >=15 ? true : false // ук диспетчерезация
		} else if(item.id == 21) {
			item.subCat[0].price = config.tehpom //ук  тех. пом.
		}
	}

	return configStep2

}