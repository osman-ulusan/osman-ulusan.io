import React, { useEffect, useState, useRef, useCallback } from 'react';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import '@inovua/reactdatagrid-community/index.css';
import '@inovua/reactdatagrid-community/theme/default-dark.css';
import '@inovua/reactdatagrid-community/theme/default-light.css';
import NumberFilter from '@inovua/reactdatagrid-community/NumberFilter';
import StringFilter from '@inovua/reactdatagrid-community/StringFilter';
import DateFilter from '@inovua/reactdatagrid-community/DateFilter';
import moment from 'moment';
import data from './fullData';
import todayData from './todayData';
import { themeChange } from 'theme-change';

window.moment = moment

const gridStyle = { minHeight: 600 };

const scrollProps = Object.assign({}, ReactDataGrid.defaultProps.scrollProps, {
});



const filterBet365Data = (data) => {
    const bet365DataArray = [];

    data.forEach((match, index) => {
        if (match.Match1x2Data.length > 0) {
            const bet365Data = {
                id: index + 1,
                Date: match.Date,
                CountryName: match.CountryName,
                TournamentName: match.TournamentName,
                HomeName: match.HomeName,
                AwayName: match.AwayName,
                IlkyariIkinciYari: match.IlkyariIkinciYari,
                IlkyarıSonucu: match.IlkyarıSonucu,
                IkinciyariSonucu: match.IkinciyariSonucu,
                Result: match.Result,
                HomeWinner: match.HomeWinner,
                AwayWinner: match.AwayWinner,
                MS1A_Opening: [],
                MS1A_Closing: [],
                MS1B_Opening: [],
                MS1B_Closing: [],
                MS1D_Opening: [],
                MS1D_Closing: [],
                IY1A_Opening: [],
                IY1A_Closing: [],
                IY1B_Opening: [],
                IY1B_Closing: [],
                IY1D_Opening: [],
                IY1D_Closing: [],
                U25A_Opening: [],
                U25A_Closing: [],
                A25A_Opening: [],
                A25A_Closing: [],
                KGVA_Opening: [],
                KGVA_Closing: [],
                KGYA_Opening: [],
                KGYA_Closing: [],
                CS10A_Opening: [],
                CS10A_Closing: [],
                CS12A_Opening: [],
                CS12A_Closing: [],
                CS02A_Opening: [],
                CS02A_Closing: [],
            };

            match.Match1x2Data.forEach(matchData => {
                if (matchData.Buro === "Bet365") {
                    matchData.Oranlar.forEach(data => {
                        bet365Data.MS1A_Opening.push(data.EvSahibiAcilisOran);
                        bet365Data.MS1A_Closing.push(data.EvSahibiOran);
                        bet365Data.MS1B_Opening.push(data.BerabereAcilisOran);
                        bet365Data.MS1B_Closing.push(data.BerabereOran);
                        bet365Data.MS1D_Opening.push(data.DeplasmanAcilisOran);
                        bet365Data.MS1D_Closing.push(data.DeplasmanOran);
                    });
                }
            });

            match.MatchIY1x2Data.forEach(matchData => {
                if (matchData.Buro === "Bet365") {
                    matchData.Oranlar.forEach(data => {
                        bet365Data.IY1A_Opening.push(data.EvSahibiAcilisOran);
                        bet365Data.IY1A_Closing.push(data.EvSahibiOran);
                        bet365Data.IY1B_Opening.push(data.BerabereAcilisOran);
                        bet365Data.IY1B_Closing.push(data.BerabereOran);
                        bet365Data.IY1D_Opening.push(data.DeplasmanAcilisOran);
                        bet365Data.IY1D_Closing.push(data.DeplasmanOran);
                    });
                }
            });

            match.Match25AUData.forEach(matchData => {
                if (matchData.Buro === "Bet365") {
                    bet365Data.U25A_Opening.push(matchData.Oranlar[0].AltAcilisOran);
                    bet365Data.U25A_Closing.push(matchData.Oranlar[0].AltOran);
                    bet365Data.A25A_Opening.push(matchData.Oranlar[0].UstAcilisOran);
                    bet365Data.A25A_Closing.push(matchData.Oranlar[0].UstOran);
                }
            });

            match.MatchKGData.forEach(matchData => {
                if (matchData.Buro === "Bet365") {
                    bet365Data.KGVA_Opening.push(matchData.Oranlar[0].YokAcilisOran);
                    bet365Data.KGVA_Closing.push(matchData.Oranlar[0].YokOran);
                    bet365Data.KGYA_Opening.push(matchData.Oranlar[0].VarAcilisOran);
                    bet365Data.KGYA_Closing.push(matchData.Oranlar[0].VarOran);
                }
            });

            match.MatchCSData.forEach(matchData => {
                if (matchData.Buro === "Bet365") {
                    bet365Data.CS10A_Opening.push(matchData.Oranlar[0].EvCifteSansAcilisOran);
                    bet365Data.CS10A_Closing.push(matchData.Oranlar[0].EvCifteSansOran);
                    bet365Data.CS12A_Opening.push(matchData.Oranlar[0].EvDepCifteSansAcilisOran);
                    bet365Data.CS12A_Closing.push(matchData.Oranlar[0].EvDepCifteSansOran);
                    bet365Data.CS02A_Opening.push(matchData.Oranlar[0].DepCifteSansAcilisOran);
                    bet365Data.CS02A_Closing.push(matchData.Oranlar[0].DepCifteSansOran);
                }
            });

            bet365DataArray.push(bet365Data);
        }
    });

    return bet365DataArray;
};
const filteringFullData = (data) => {
    const filteringFullDataArray = [];

    data.forEach((match, index) => {
        if (match.Match1x2Data.length > 0) {
            const bet365Data = {
                id: index + 1,
                Date: match.Date,
                CountryName: match.CountryName,
                TournamentName: match.TournamentName,
                HomeName: match.HomeName,
                AwayName: match.AwayName,
                IlkyariIkinciYari: match.IlkyariIkinciYari,
                IlkyarıSonucu: match.IlkyarıSonucu,
                IkinciyariSonucu: match.IkinciyariSonucu,
                Result: match.Result,
                HomeWinner: match.HomeWinner,
                AwayWinner: match.AwayWinner,
                MS1A_Opening: [],
                MS1A_Closing: [],
                MS1B_Opening: [],
                MS1B_Closing: [],
                MS1D_Opening: [],
                MS1D_Closing: [],
                IY1A_Opening: [],
                IY1A_Closing: [],
                IY1B_Opening: [],
                IY1B_Closing: [],
                IY1D_Opening: [],
                IY1D_Closing: [],
                U25A_Opening: [],
                U25A_Closing: [],
                A25A_Opening: [],
                A25A_Closing: [],
                KGVA_Opening: [],
                KGVA_Closing: [],
                KGYA_Opening: [],
                KGYA_Closing: [],
                CS10A_Opening: [],
                CS10A_Closing: [],
                CS12A_Opening: [],
                CS12A_Closing: [],
                CS02A_Opening: [],
                CS02A_Closing: [],
            };

            match.Match1x2Data.forEach(matchData => {
                if (matchData.Buro === "Bet365") {
                    matchData.Oranlar.forEach(data => {
                        bet365Data.MS1A_Opening.push(data.EvSahibiAcilisOran);
                        bet365Data.MS1A_Closing.push(data.EvSahibiOran);
                        bet365Data.MS1B_Opening.push(data.BerabereAcilisOran);
                        bet365Data.MS1B_Closing.push(data.BerabereOran);
                        bet365Data.MS1D_Opening.push(data.DeplasmanAcilisOran);
                        bet365Data.MS1D_Closing.push(data.DeplasmanOran);
                    });
                }
            });

            match.MatchIY1x2Data.forEach(matchData => {
                if (matchData.Buro === "Bet365") {
                    matchData.Oranlar.forEach(data => {
                        bet365Data.IY1A_Opening.push(data.EvSahibiAcilisOran);
                        bet365Data.IY1A_Closing.push(data.EvSahibiOran);
                        bet365Data.IY1B_Opening.push(data.BerabereAcilisOran);
                        bet365Data.IY1B_Closing.push(data.BerabereOran);
                        bet365Data.IY1D_Opening.push(data.DeplasmanAcilisOran);
                        bet365Data.IY1D_Closing.push(data.DeplasmanOran);
                    });
                }
            });

            match.Match25AUData.forEach(matchData => {
                if (matchData.Buro === "Bet365") {
                    bet365Data.U25A_Opening.push(matchData.Oranlar[0].AltAcilisOran);
                    bet365Data.U25A_Closing.push(matchData.Oranlar[0].AltOran);
                    bet365Data.A25A_Opening.push(matchData.Oranlar[0].UstAcilisOran);
                    bet365Data.A25A_Closing.push(matchData.Oranlar[0].UstOran);
                }
            });

            match.MatchKGData.forEach(matchData => {
                if (matchData.Buro === "Bet365") {
                    bet365Data.KGVA_Opening.push(matchData.Oranlar[0].YokAcilisOran);
                    bet365Data.KGVA_Closing.push(matchData.Oranlar[0].YokOran);
                    bet365Data.KGYA_Opening.push(matchData.Oranlar[0].VarAcilisOran);
                    bet365Data.KGYA_Closing.push(matchData.Oranlar[0].VarOran);
                }
            });

            match.MatchCSData.forEach(matchData => {
                if (matchData.Buro === "Bet365") {
                    bet365Data.CS10A_Opening.push(matchData.Oranlar[0].EvCifteSansAcilisOran);
                    bet365Data.CS10A_Closing.push(matchData.Oranlar[0].EvCifteSansOran);
                    bet365Data.CS12A_Opening.push(matchData.Oranlar[0].EvDepCifteSansAcilisOran);
                    bet365Data.CS12A_Closing.push(matchData.Oranlar[0].EvDepCifteSansOran);
                    bet365Data.CS02A_Opening.push(matchData.Oranlar[0].DepCifteSansAcilisOran);
                    bet365Data.CS02A_Closing.push(matchData.Oranlar[0].DepCifteSansOran);
                }
            });

            filteringFullDataArray.push(bet365Data);
        }
    });

    return filteringFullDataArray;
};

const styleColumnsAcilis = {
    minWidth: 150,
    headerAlign: 'center',
    textAlign: 'center',
    defaultFlex: 2
};
const styleColumnsKapanis = {
    minWidth: 150,
    headerAlign: 'center',
    textAlign: 'center',
};

const styleColumnsGenel = {
    headerAlign: 'center',
    textAlign: 'center',
};


const columns = [
    {
        name: 'Date',
        header: 'Tarih',
        ...styleColumnsGenel,
        defaultFlex: 1,
        minWidth: 200,
        filterEditor: DateFilter,
        filterEditorProps: (props, { index }) => {
            // for range and notinrange operators, the index is 1 for the after field
            return {
                dateFormat: 'DD-MM-YYYY HH:SS',
                cancelButton: false,
                highlightWeekends: false,
                //placeholder: index == 1 ? 'Created date is before...' : 'Created date is after...'
            }
        },
        render: ({ value, cellProps }) => {
            return moment(value).format('DD-MM-YYYY HH:SS')
        }
    },
    { name: 'CountryName', header: 'Ülke', ...styleColumnsGenel },
    { name: 'TournamentName', header: 'Lig', ...styleColumnsGenel },
    { name: 'HomeName', header: 'Ev Sahibi', ...styleColumnsGenel },
    { name: 'AwayName', header: 'Deplasman', ...styleColumnsGenel },
    //{ name: 'IlkyariIkinciYari', header: '1. Yarı' },
    { name: 'IlkyarıSonucu', header: '1.Yarı', ...styleColumnsGenel },
    { name: 'IkinciyariSonucu', header: '2.Yarı', ...styleColumnsGenel },
    { name: 'Result', header: 'Skor', ...styleColumnsGenel },
    {
        name: 'AwayWinner',
        header: 'Sonuç',
        ...styleColumnsGenel,
        render: ({ value, cellProps, data }) => {
            let resultText;
            if (data.HomeWinner === 'win') {
                resultText = '1';
                cellProps.style.background = '#03590c'; // Arka plan rengi ayarla
            } else if (data.HomeWinner === 'lost') {
                resultText = '2';
                cellProps.style.background = '#9e0512'; // Arka plan rengi ayarla
            } else {
                resultText = '0';
                cellProps.style.background = '#889107'; // Arka plan rengi ayarla
            }
            return <span style={{ color: 'white', fontSize: 'bold' }}>{resultText}</span>;
        },
        showInContextMenu: false // Bağlam
    },
    //{ name: 'HomeWinner', header: 'Ev Sahibi Kazanan', onRender: (cellProps, {data}) => {
    //cellProps.style.background = data.HomeWinner === 'win' ? '#03590c': '#252854' }},
    //{ name: 'AwayWinner', header: 'Deplasman Kazanan' },
    {
        name: 'MS1A_Opening',
        header: 'MS1/A',
        group: 'MS1',
        ...styleColumnsAcilis,
    },
    { name: 'MS1A_Closing', header: 'MS1/K', group: 'MS1', ...styleColumnsKapanis },
    { name: 'MS1B_Opening', header: 'MS0/A', group: 'MS0', ...styleColumnsAcilis },
    { name: 'MS1B_Closing', header: 'MS0/K', group: 'MS0', ...styleColumnsKapanis },
    { name: 'MS1D_Opening', header: 'MS2/A', group: 'MS2', ...styleColumnsAcilis },
    { name: 'MS1D_Closing', header: 'MS2/K', group: 'MS2', ...styleColumnsKapanis },
    { name: 'IY1A_Opening', header: 'IY1/A', group: 'IY1', ...styleColumnsAcilis },
    { name: 'IY1A_Closing', header: 'IY1/K', group: 'IY1', ...styleColumnsKapanis },
    { name: 'IY1B_Opening', header: 'IY0/A', group: 'IY0', ...styleColumnsAcilis },
    { name: 'IY1B_Closing', header: 'IY0/K', group: 'IY0', ...styleColumnsKapanis },
    { name: 'IY1D_Opening', header: 'IY2/A', group: 'IY2', ...styleColumnsAcilis },
    { name: 'IY1D_Closing', header: 'IY2/K', group: 'IY2', ...styleColumnsKapanis },
    { name: 'U25A_Opening', header: 'Ü2.5/A', group: 'U2.5', ...styleColumnsAcilis },
    { name: 'U25A_Closing', header: 'Ü2.5/K', group: 'U2.5', ...styleColumnsKapanis },
    { name: 'A25A_Opening', header: 'A2.5/A', group: 'A2.5', ...styleColumnsAcilis },
    { name: 'A25A_Closing', header: 'A2.5/K', group: 'A2.5', ...styleColumnsKapanis },
    { name: 'KGVA_Opening', header: 'KGVAR/A', group: 'KGV', ...styleColumnsAcilis },
    { name: 'KGVA_Closing', header: 'KGVAR/K', group: 'KGV', ...styleColumnsKapanis },
    { name: 'KGYA_Opening', header: 'KGYOK/A', group: 'KGY', ...styleColumnsAcilis },
    { name: 'KGYA_Closing', header: 'KGYOK/K', group: 'KGY', ...styleColumnsKapanis },
    { name: 'CS10A_Opening', header: 'ÇS10/A', group: 'CS10', ...styleColumnsAcilis },
    { name: 'CS10A_Closing', header: 'ÇŞ10/K', group: 'CS10', ...styleColumnsKapanis },
    { name: 'CS12A_Opening', header: 'ÇŞ12/A', group: 'CS12', ...styleColumnsAcilis },
    { name: 'CS12A_Closing', header: 'ÇŞ12/K', group: 'CS12', ...styleColumnsKapanis },
    { name: 'CS02A_Opening', header: 'ÇŞ02/A', group: 'CS02', ...styleColumnsAcilis },
    { name: 'CS02A_Closing', header: 'ÇŞ02/K', group: 'CS02', ...styleColumnsKapanis },
];

const groups = [
    { name: 'MS1', header: 'MAÇ SONUCU 1', headerAlign: 'center' },
    { name: 'MS0', header: 'MAÇ SONUCU 0', headerAlign: 'center' },
    { name: 'MS2', header: 'MAÇ SONUCU 2', headerAlign: 'center' },
    { name: 'IY1', header: 'İLK YARI 1', headerAlign: 'center' },
    { name: 'IY0', header: 'İLK YARI 0', headerAlign: 'center' },
    { name: 'IY2', header: 'İLK YARI 2', headerAlign: 'center' },
    { name: 'U2.5', header: '2.5 ÜST', headerAlign: 'center' },
    { name: 'A2.5', header: '2.5 ALT', headerAlign: 'center' },
    { name: 'KGV', header: 'KG VAR', headerAlign: 'center' },
    { name: 'KGY', header: 'KG YOK', headerAlign: 'center' },
    { name: 'CS10', header: 'ÇŞ 1-0', headerAlign: 'center' },
    { name: 'CS12', header: 'ÇŞ 1-2', headerAlign: 'center' },
    { name: 'CS02', header: 'ÇŞ 0-2', headerAlign: 'center' },
];


const Table = () => {
    const [dataSource, setDataSource] = useState([]);
    const [fullDataSource, setFullDataSource] = useState([]);
    const [leakData, setLeakData] = useState([]);
    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme"));


    scrollProps.scrollThumbStyle = {
        background: '#ff7474'
    };
    scrollProps.scrollThumbWidth = 10;
    scrollProps.scrollThumbOverWidth = 20;

    const customI18n = Object.assign({}, ReactDataGrid.defaultProps.i18n, {
        pageText: 'Sayfa ',
        ofText: ' / ',
        perPageText: 'Sonuçlar sayfa başına',
        showingText: 'Gösteriliyor ',
        clearAll: 'Hepsini Temizle',
        clear: 'Temizle',
        before: 'Önce',
        after: 'Sonra',
        afterOrOn: 'Sonra veya aynı gün',
        beforeOrOn: 'Önce veya aynı gün',
        inrange: 'Aralıkta',
        notinrange: 'Aralıkta değil',
        showFilteringRow: 'Filtreleme satırını göster',
        hideFilteringRow: 'Filtreleme satırını gizle',
        dragHeaderToGroup: 'Gruplamak için başlığı sürükleyin',
        disable: 'Devre dışı bırak',
        enable: 'Etkinleştir',
        sortAsc: 'Artan sırala',
        sortDesc: 'Azalan sırala',
        unsort: 'Sıralamayı kaldır',
        group: 'Grupla',
        ungroup: 'Gruplamayı Kaldır',
        lockStart: 'Başlangıcı Kitle',
        lockEnd: 'Sonu Kitle',
        unlock: 'Kilidi Aç',
        columns: 'Sütunlar',
        contains: 'İçeriyor',
        startsWith: 'İle Başlıyor',
        endsWith: 'İle Bitiyor',
        notContains: 'İçermiyor',
        neq: 'Eşit Değil',
        eq: 'Eşittir',
        notEmpty: 'Boş Değil',
        empty: 'Boş',
        lt: 'Küçüktür',
        lte: 'Küçük veya Eşit',
        gt: 'Büyüktür',
        gte: 'Büyük veya Eşit',
        calendar: {
            todayButtonText: 'Bugün',
            clearButtonText: 'Temizle',
            okButtonText: 'Tamam',
            cancelButtonText: 'İptal'
        }
    });

    const filterTypes = Object.assign({}, ReactDataGrid.defaultProps.filterTypes, {
        MS1A_Opening: {
            name: 'MS1A_Opening',
            emptyValue: '',
            operators: [
                {
                    name: 'Birebir Eşleşme',
                    fn: ({ value, filterValue, data }) => {
                        //console.log(value, filterValue, data);
                        //const normalizedValue = value.replace(/,/g, '.');
                        const normalizedFilterValue = filterValue.toString().replace(/,/g, '.');

                        const parsedValue = parseFloat(value);
                        const parsedFilterValue = parseFloat(normalizedFilterValue);
                        return parsedValue === parsedFilterValue;
                    }
                },
                {
                    name: 'Toleranslı Eşleşme',
                    fn: ({ value, filterValue, data }) => {
                        const normalizedFilterValue = filterValue.replace(/,/g, '.');

                        const parsedValue = parseFloat(value);
                        const parsedFilterValue = parseFloat(normalizedFilterValue);

                        return value.toString().startsWith(parsedFilterValue.toString());
                    }
                }
            ]
        }
    });

    const [filterValue, setFilterValue] = useState([
        /*{
            name: 'Date',
            operator: 'before',
            type: 'date',
            value: ''
        },*/
        { name: 'CountryName', operator: 'contains', type: 'string' },
        { name: 'TournamentName', operator: 'contains', type: 'string' },
        { name: 'HomeName', operator: 'contains', type: 'string' },
        { name: 'AwayName', operator: 'contains', type: 'string' },
        { name: 'MS1A_Opening', operator: 'Birebir Eşleşme', type: 'MS1A_Opening', value: '' },
        { name: 'MS1A_Closing', operator: 'Birebir Eşleşme', type: 'MS1A_Opening', value: '' },
        { name: 'MS1B_Opening', operator: 'Birebir Eşleşme', type: 'MS1A_Opening', value: '' },
        { name: 'MS1B_Closing', operator: 'Birebir Eşleşme', type: 'MS1A_Opening', value: '' },
        { name: 'MS1D_Opening', operator: 'Birebir Eşleşme', type: 'MS1A_Opening', value: '' },
        { name: 'MS1D_Closing', operator: 'Birebir Eşleşme', type: 'MS1A_Opening', value: '' },

        { name: 'IY1A_Opening', operator: 'Birebir Eşleşme', type: 'MS1A_Opening', value: '' },
        { name: 'IY1A_Closing', operator: 'Birebir Eşleşme', type: 'MS1A_Opening', value: '' },
        { name: 'IY1B_Opening', operator: 'Birebir Eşleşme', type: 'MS1A_Opening', value: '' },
        { name: 'IY1B_Closing', operator: 'Birebir Eşleşme', type: 'MS1A_Opening', value: '' },
        { name: 'IY1D_Opening', operator: 'Birebir Eşleşme', type: 'MS1A_Opening', value: '' },
        { name: 'IY1D_Closing', operator: 'Birebir Eşleşme', type: 'MS1A_Opening', value: '' },

        { name: 'U25A_Opening', operator: 'Birebir Eşleşme', type: 'MS1A_Opening', value: '' },
        { name: 'U25A_Closing', operator: 'Birebir Eşleşme', type: 'MS1A_Opening', value: '' },
        { name: 'A25A_Opening', operator: 'Birebir Eşleşme', type: 'MS1A_Opening', value: '' },
        { name: 'A25A_Closing', operator: 'Birebir Eşleşme', type: 'MS1A_Opening', value: '' },

        { name: 'KGVA_Opening', operator: 'Birebir Eşleşme', type: 'MS1A_Opening', value: '' },
        { name: 'KGVA_Closing', operator: 'Birebir Eşleşme', type: 'MS1A_Opening', value: '' },
        { name: 'KGYA_Opening', operator: 'Birebir Eşleşme', type: 'MS1A_Opening', value: '' },
        { name: 'KGYA_Closing', operator: 'Birebir Eşleşme', type: 'MS1A_Opening', value: '' },

        { name: 'CS10A_Opening', operator: 'Birebir Eşleşme', type: 'MS1A_Opening', value: '' },
        { name: 'CS10A_Closing', operator: 'Birebir Eşleşme', type: 'MS1A_Opening', value: '' },
        { name: 'CS12A_Opening', operator: 'Birebir Eşleşme', type: 'MS1A_Opening', value: '' },
        { name: 'CS12A_Closing', operator: 'Birebir Eşleşme', type: 'MS1A_Opening', value: '' },
        { name: 'CS02A_Opening', operator: 'Birebir Eşleşme', type: 'MS1A_Opening', value: '' },
        { name: 'CS02A_Closing', operator: 'Birebir Eşleşme', type: 'MS1A_Opening', value: '' },
    ]);

    useEffect(() => {
        const bet365DataToday = filterBet365Data(data);
        setDataSource(bet365DataToday);

        const filterinData = filteringFullData(todayData);
        setFullDataSource(filterinData);
        setLeakData(filterinData);


        const themeChangedHandler = () => {
            const newTheme = localStorage.getItem("theme");
            setCurrentTheme(newTheme);
        };

        // Tema değişikliğini dinlemek için etkinlik dinleyicisini ekleyin
        document.addEventListener('themeChanged', themeChangedHandler);

        // Tema değişikliği etkinlik dinleyicisini kaldırın
        return () => {
            document.removeEventListener('themeChanged', themeChangedHandler);
        };
    }, []); // currentTheme değiştiğinde useEffect'i tekrar çağırmak için dependency ekledik


    const handleFilterChange = (value) => {
        // Filtre değerini güncelle
        setFilterValue(value);
        // Veri kaynağını güncelle (burada dataSource veya fullDataSource'a göre güncelleme yapıyorsunuz)
        const data = value.some(filter => filter.value) ? dataSource : fullDataSource;
        setLeakData(data);
    };

    const handleCellDoubleClick = (cellProps, event) => {
        const rowData = event.data;
        // Çift tıklanan hücrenin değerini al ve filtre değeri olarak ayarla
        const newFilterValue = filterValue.map(filter => {
            if (filter.name === event.name) {
                return { ...filter, value: event.value.toString() };
            }
            return filter;
        });
        /*const filteredData = dataSource.filter(row => {
            const gelen = filterTypes['MS1A_Opening'].operators[0].fn({ value: row[event.name], filterValue: event.value, data: row });
            return gelen;
        });*/
        setFilterValue(newFilterValue);
        //setLeakData(filteredData);
    };

    /*const onRowDoubleClick = (selectedRow) => {
        console.log(selectedRow.target.childNodes[0].parentNode.lastChild.parentElement.offsetParent.attributes[2].value);
    };*/

    /*const onCellDoubleClick = useCallback((event, cellProps) => {
        const { value, id } = cellProps;
        console.log(value, id); // For debugging

        const ms1aOpeningIndex = filterValue.findIndex(
            filter => filter.name === id
        );

        if (ms1aOpeningIndex !== -1) {
            // Update the value in the MS1A_Opening filter object
            filterValue[ms1aOpeningIndex].value = value.toString();
            handleFilterChange(filterValue);

            console.log(filterValue);
        } else {
            console.warn(`No filter found for name: MS1A_Opening`);
        }
    }, []);*/

    return (
        <div /*style={{ zoom: "75%" }}*/>
            <ReactDataGrid
                i18n={customI18n}
                idProperty="id"
                columns={columns}
                dataSource={leakData}
                style={gridStyle}
                filterValue={filterValue}
                //defaultFilterValue={filterValue}
                filterTypes={filterTypes}
                onFilterValueChange={handleFilterChange}
                onCellDoubleClick={handleCellDoubleClick}
                scrollProps={scrollProps}
                groups={groups}
                pagination
                theme={currentTheme === "dark" ? "default-dark" : "default-light"}
            />
        </div>
    );
};

export default Table;