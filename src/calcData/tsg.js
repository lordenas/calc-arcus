export default {
	oneTimeCosts: [
		{
			id: 23,
			titleText: 'Программный комплекс АРКУС, в т.ч.',
			title: true,
			price: 20000,
			sum: 0,
			active: false,
			subCat: [
				{
					id: 24,
					titleText: 'установка и внедрение на компьютеры компании',
					title: false,
					price: 20000,
					sum: 0,
					active: true,
					input: false,
					inputCalc: 1,
					disabled: true
				},
				{
					id: 25,
					titleText: 'конвертация данных из предыдущей программы (укажите кол. месяцев)',
					title: false,
					price: 10000,
					sum: 0,
					active: false,
					inputCalc: 6,
					input: true,
					indFormula: '7000 + (item.inputCalc * 500)',
					
				},
			]
		},
		{
			id: 26,
			titleText: 'Бухгалтерский учет, в т.ч.',
			title: true,
			price: 10300,
			sum: 0,
			active: false,
			subCat: [
				{
					id: 27,
					titleText: '1С: Бухгалтерия 8. Базовая версия',
					title: false,
					price: 5400,
					sum: 0,
					active: true,
					input: false,
					inputCalc: 1
				},
				{
					id: 28,
					titleText: 'сервис 1С-Отчетность (лицензия на 1 год)',
					title: false,
					price: 4900,
					sum: 0,
					active: true,
					input: false,
					inputCalc: 1
				},
			]
		},
		{
			id: 29,
			titleText: 'Безопасность данных, в т.ч.',
			title: true,
			price: 1320,
			onePrice: 1320,
			sum: 0,
			active: false,
			subCat: [
				{
					id: 30,
					titleText: '"Kaspersky Anti-Virus" (лицензия на 1 год) (кол. компьютеров)',
					title: false,
					price: 1320,
					sum: 0,
					active: true,
					input: true,
					indFormula: 'Math.ceil(item.inputCalc / 2) * 1320',
					inputCalc: 1
				},
			]
		},

	],
	monthlyCosts: [
		{
			id: 31,
			titleText: 'Программный комплекс АРКУС, в т.ч.',
			title: true,
			price: 1500,
			sum: 0,
			active: false,
			subCat: [
				{
					id: 32,
					titleText: 'техническая поддержка ПК АРКУС',
					title: false,
					price: 1500,
					sum: 0,
					active: true,
					input: false,
					inputCalc: 1
				},
			]
		},
		{
			id: 33,
			titleText: 'Требования законодательства, в т.ч.',
			title: true,
			price: 2400,
			sum: 0,
			active: false,
			subCat: [
				{
					id: 34,
					titleText: 'размещение информации в ГИС ЖКХ',
					title: false,
					price: 2000,
					sum: 0,
					active: true,
					input: false,
					inputCalc: 1
				},
				{
					id: 35,
					titleText: 'сайт для товариществ собственников жилья',
					title: false,
					price: 400,
					sum: 0,
					active: true,
					input: false,
					inputCalc: 1
				},
			]
		},
		{
			id: 36,
			titleText: 'Безопасность данных, в т.ч.',
			title: true,
			price: 150,
			sum: 0,
			active: false,
			subCat: [
				{
					id: 37,
					titleText: 'резервное копирование базы данных 1С (1 шт.)',
					title: false,
					price: 150,
					sum: 0,
					active: true,
					input: true,
					inputCalc: 1,
					indFormula: 'item.inputCalc * 150',
				},
			]
		},
		{
			id: 37,
			titleText: 'Техническая помощь, в т.ч.',
			title: true,
			price: 4200,
			sum: 0,
			active: false,
			subCat: [
				{
					id: 38,
					titleText: 'обслуживание техники',
					title: false,
					price: 4200,
					sum: 0,
					active: false,
					input: false,
					inputCalc: 1,
				},
			]
		},
	]
}