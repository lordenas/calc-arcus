export default {
	oneTimeCosts: [
		{
			id: 0,
			titleText: 'Программный комплекс АРКУС, в т.ч.',
			title: true,
			price: 20000,
			sum: 0,
			active: false,
			subCat: [
				{
					id: 1,
					titleText: 'Установка и внедрение на компьютеры компании',
					title: false,
					price: 20000,
					sum: 0,
					active: true,
					input: false,
					inputCalc: 1,
					disabled: true
				},
				{
					id: 2,
					titleText: 'Конвертация данных из предыдущей программы (кол. месяцев)',
					title: false,
					price: 13000,
					sum: 0,
					active: true,
					inputCalc: 12,
					input: true,
					indFormula: '7000 + (item.inputCalc * 500)',
				},
			]
		},
		{
			id: 3,
			titleText: 'Требования законодательства, в т.ч.',
			title: true,
			price: 20000,
			sum: 0,
			active: false,
			subCat: [
				{
					id: 4,
					titleText: 'Фискальный накопитель',
					title: false,
					price: 12600,
					sum: 0,
					active: true,
					input: false,
					inputCalc: 1
				},
				{
					id: 5,
					titleText: 'АРКУС: Диспетчеризация',
					title: false,
					price: 6000,
					sum: 0,
					active: false,
					inputCalc: 1,
					input: false,
				},
			]
		},
		{
			id: 6,
			titleText: 'Бухгалтерский учет, в т.ч.',
			title: true,
			price: 10300,
			sum: 0,
			active: false,
			subCat: [
				{
					id: 7,
					titleText: '1С: Бухгалтерия',
					title: false,
					price: 13000,
					sum: 0,
					active: true,
					input: false,
					inputCalc: 1,
					activeSelect: 0,
					select: true,
					selectItems: [
						{
							value: 0,
							title: '"1С: Бухгалтерия 8.3 Базовая версия"',
							price: 5400
						},
						{
							value: 1,
							title: '"1С: Бухгалтерия 8.3 ПРОФ"',
							price: 13000
						},
					]
				},
				{
					id: 8,
					titleText: '"1С: Зарплата и управление персоналом"',
					title: false,
					price: 8100,
					sum: 0,
					active: true,
					input: false,
					inputCalc: 1,
					activeSelect: 0,
					select: true,
					selectItems: [
						{
							value: 0,
							title: '"1С: Зарплата и управление персоналом 8. Базовая версия"',
							price: 8100
						},
						{
							value: 1,
							title: '"1С: Зарплата и управление персоналом 8. ПРОФ"',
							price: 22600
						},
					]
				},
				{
					id: 9,
					titleText: 'Сервис 1С-Отчетность (лицензия на 1 год)',
					title: false,
					price: 4900,
					sum: 0,
					active: true,
					inputCalc: 1,
					input: false,
				},
			]
		},
		{
			id: 10,
			titleText: 'Безопасность данных, в т.ч.',
			title: true,
			price: 1320,
			onePrice: 1320,
			sum: 0,
			active: false,
			subCat: [
				{
					id: 11,
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
			id: 12,
			titleText: 'Программный комплекс АРКУС, в т.ч.',
			title: true,
			price: 1500,
			sum: 0,
			active: false,
			subCat: [
				{
					id: 13,
					titleText: 'Техническая поддержка ПК АРКУС',
					title: false,
					price: 1500,
					sum: 0,
					active: true,
					input: false,
					disabled: true,
					inputCalc: 1
				},
			]
		},
		{
			id: 14,
			titleText: 'Требования законодательства, в т.ч.',
			title: true,
			price: 2400,
			sum: 0,
			active: false,
			subCat: [
				{
					id: 15,
					titleText: 'Размещение информации в ГИС ЖКХ',
					title: false,
					price: 2000,
					sum: 0,
					active: true,
					input: false,
					inputCalc: 1
				},
				{
					id: 16,
					titleText: 'Сайт для управляющей компании',
					title: false,
					price: 700,
					sum: 0,
					active: true,
					input: false,
					inputCalc: 1
				},
				{
					id: 17,
					titleText: 'Взаимодействие с онлайн-кассой',
					title: false,
					price: 2000,
					sum: 0,
					active: true,
					input: false,
					inputCalc: 1
				},
				{
					id: 18,
					titleText: 'АРКУС: Диспетчеризация',
					title: false,
					price: 2000,
					sum: 0,
					active: true,
					input: false,
					inputCalc: 1,
					disabled: true
				},
			]
		},
		{
			id: 19,
			titleText: 'Безопасность данных, в т.ч.',
			title: true,
			price: 150,
			sum: 0,
			active: false,
			subCat: [
				{
					id: 20,
					titleText: 'Резервное копирование базы данных 1С ( шт.)',
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
			id: 21,
			titleText: 'Техническая помощь, в т.ч.',
			title: true,
			price: 150,
			sum: 0,
			active: false,
			subCat: [
				{
					id: 22,
					titleText: 'Обслуживание компьютерной техники',
					title: false,
					price: 150,
					sum: 0,
					active: true,
					input: false,
					inputCalc: 1,
				},
			]
		},
	]
}