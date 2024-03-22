import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import React, { StrictMode, useEffect, useMemo, useState, useCallback, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import data from './fullData';
import todayData from './todayData';
import { AG_GRID_LOCALE_ZZZ } from "./locale.js";

const ragCellClassRules = {
  // apply green to electric cars
  'rag-green': (params) => params.value === true,
};

const gridDiv = document.querySelector('#myGrid');

const Table = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '550px' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

  const [rowData, setRowData] = useState();
  const [dataToday, setDataToday] = useState([]); // useNewData -> dataToday
  const [dataFull, setDataFull] = useState([]); // newData -> dataFull
  const [selectedRow, setSelectedRow] = useState([]);
  const [topRow, setTopRow] = useState(null);

  const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme"));

  var filterParams = {
    comparator: function (filterLocalDateAtMidnight, cellValue) {
      var cellDate = new Date(cellValue); // ISO 8601 formatındaki veriyi tarih nesnesine dönüştürür
      cellDate.setHours(0, 0, 0, 0); // Saat, dakika, saniye ve milisaniyeyi sıfırlar

      // Filtreleme için sadece tarih kısmını dikkate alır
      var filterDate = new Date(filterLocalDateAtMidnight.getTime());

      if (cellDate.getTime() === filterDate.getTime()) {
        return 0;
      }
      if (cellDate < filterDate) {
        return -1;
      }
      if (cellDate > filterDate) {
        return 1;
      }
      return 0;
    },
    minValidYear: 2000,
    maxValidYear: 2050,
    inRangeFloatingFilterDateFormat: 'Do MMM YYYY',
  };
  const customRenderer = (params) => {
    const data = params.data;
    let resultText;

    if (data.HomeWinner === 'win') {
      resultText = '1';
      //cellProps.style.background = '#03590c'; // Arka plan rengi ayarla
    } else if (data.HomeWinner === 'lost') {
      resultText = '2';
      //cellProps.style.background = '#9e0512'; // Arka plan rengi ayarla
    } else {
      resultText = '0';
      //cellProps.style.background = '#889107'; // Arka plan rengi ayarla
    }

    return (
      <div>
        {resultText}
      </div>
    );
  };


  const bet365Data = (data) => {
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

  /*function contains(target, lookingFor) {
    console.log(target, lookingFor);
    return target === lookingFor;
  }*/

  var oddsFilterParams = {
    filterOptions: ["equals", "contains"],
    textMatcher: ({ filterOption, value, filterText }) => {
      switch (filterOption) {
        case 'equals': //birebir
          const filterValue = filterText.toString().replace(/,/g, '.');
          return value === filterValue;
        case 'contains': //toleranslı
          const filterValue2 = filterText.toString().replace(/,/g, '.');
          return value.indexOf(filterValue2) >= 0;
        default:
          return false;
      }
    },
  };

  const [columnDefs, setColumnDefs] = useState([
    {
      field: 'Date',
      filter: 'agDateColumnFilter',
      filterParams: filterParams,
      headerName: 'Tarih',
      minWidth: 180,
      valueFormatter: function (params) {
        var date = new Date(params.value);
        var day = date.getDate().toString().padStart(2, '0');
        var month = (date.getMonth() + 1).toString().padStart(2, '0');
        var year = date.getFullYear();
        var hours = date.getHours().toString().padStart(2, '0');
        var minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}.${month}.${year} ${hours}:${minutes}`;
      }
    },
    {
      field: 'CountryName',
      headerName: 'Ülke'
    },
    { field: 'TournamentName', headerName: 'Lig', filter: true },
    { field: 'HomeName', headerName: 'Ev Sahibi', filter: true },
    { field: 'AwayName', headerName: 'Deplasman', filter: true },
    { field: 'IlkyarıSonucu', headerName: '1.Yarı', filter: true },
    { field: 'IkinciyariSonucu', headerName: '2.Yarı', filter: true },
    { field: 'Result', headerName: 'Skor', filter: true },
    {
      field: 'AwayWinner',
      headerName: 'Sonuç',
      cellRenderer: customRenderer,
      filter: true,
      filterParams: {
        /*textMatcher: ({ value, filterText }) => {
          console.log(value, filterText);
          var aliases = {
            1: "win",
            0: "draw",
            2: "lost",
          };
      
          var literalMatch = contains(value, filterText || "");
      
          return !!literalMatch || !!contains(value, aliases[filterText || ""]);
        },*/
        textMatcher: ({ filterOption, value, filterText }) => {
          if (filterText == null) {
            return false;
          }
          switch (filterText) {
            case '1':
              return value === "lost";
            case '0':
              return value === "draw";
            case '2':
              return value === "win";
            default:
              return false;
          }
        }
      }
    },
    {
      headerName: 'MAÇ SONUCU 1',
      children: [
        {
          field: 'MS1A_Opening',
          headerName: 'MS1/A',
          filterParams: oddsFilterParams,
          /*filterParams: {
            filterOptions: [
              'equals',
              'contains',
            ],
          },*/
          /*filterParams: {
            buttons: ['reset', 'apply'],
          },*/
        },
        { field: 'MS1A_Closing', headerName: 'MS1/K', filterParams: oddsFilterParams },
      ]
    },
    {
      headerName: 'MAÇ SONUCU 0',
      children: [
        { field: 'MS1B_Opening', headerName: 'MS0/A', filterParams: oddsFilterParams },
        { field: 'MS1B_Closing', headerName: 'MS0/K', filterParams: oddsFilterParams },
      ]
    },
    {
      headerName: 'MAÇ SONUCU 2',
      children: [
        { field: 'MS1D_Opening', headerName: 'MS2/A', filterParams: oddsFilterParams },
        { field: 'MS1D_Closing', headerName: 'MS2/K', filterParams: oddsFilterParams },
      ]
    },
    {
      headerName: 'İLK YARI 1',
      children: [
        { field: 'IY1A_Opening', headerName: 'IY1/A', filterParams: oddsFilterParams },
        { field: 'IY1A_Closing', headerName: 'IY1/K', filterParams: oddsFilterParams },
      ]
    },
    {
      headerName: 'İLK YARI 0',
      children: [
        { field: 'IY1B_Opening', headerName: 'IY0/A', filterParams: oddsFilterParams },
        { field: 'IY1B_Closing', headerName: 'IY0/K', filterParams: oddsFilterParams },
      ]
    },
    {
      headerName: 'İLK YARI 2',
      children: [
        { field: 'IY1D_Opening', headerName: 'IY2/A', filterParams: oddsFilterParams },
        { field: 'IY1D_Closing', headerName: 'IY2/K', filterParams: oddsFilterParams },
      ]
    },
    {
      headerName: '2.5 ÜST',
      children: [
        { field: 'U25A_Opening', headerName: 'Ü2.5/A', filterParams: oddsFilterParams },
        { field: 'U25A_Closing', headerName: 'Ü2.5/K', filterParams: oddsFilterParams },
      ]
    },
    {
      headerName: '2.5 ALT',
      children: [
        { field: 'A25A_Opening', headerName: 'A2.5/A', filterParams: oddsFilterParams },
        { field: 'A25A_Closing', headerName: 'A2.5/K', filterParams: oddsFilterParams },
      ]
    },
    {
      headerName: 'KG VAR',
      children: [
        { field: 'KGVA_Opening', headerName: 'KGVAR/A', filterParams: oddsFilterParams },
        { field: 'KGVA_Closing', headerName: 'KGVAR/K', filterParams: oddsFilterParams },
      ]
    },
    {
      headerName: 'KG YOK',
      children: [
        { field: 'KGYA_Opening', headerName: 'KGYOK/A', filterParams: oddsFilterParams },
        { field: 'KGYA_Closing', headerName: 'KGYOK/K', filterParams: oddsFilterParams },
      ]
    },
    {
      headerName: 'ÇŞ 1-0',
      children: [
        { field: 'CS10A_Opening', headerName: 'ÇS10/A', filterParams: oddsFilterParams },
        { field: 'CS10A_Closing', headerName: 'ÇS10/K', filterParams: oddsFilterParams },
      ]
    },
    {
      headerName: 'ÇŞ 1-2',
      children: [
        { field: 'CS12A_Opening', headerName: 'ÇŞ12/A', filterParams: oddsFilterParams },
        { field: 'CS12A_Closing', headerName: 'ÇŞ12/K', filterParams: oddsFilterParams },
      ]
    },
    {
      headerName: 'ÇŞ 0-2',
      children: [
        { field: 'CS02A_Opening', headerName: 'ÇŞ02/A', filterParams: oddsFilterParams },
        { field: 'CS02A_Closing', headerName: 'ÇŞ02/K', filterParams: oddsFilterParams },
      ]
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 150,
      filter: true,
      floatingFilter: true,
      filterParams: {
        buttons: ["clear"],
      },
    };
  }, []);
  const rowClassRules = useMemo(() => {
    return {
      // apply red to Ford cars
      'rag-red': (params) => params.data.CountryName === 'Turkey',
    };
  }, []);
  const paginationPageSizeSelector = useMemo(() => {
    return [200, 500, 1000];
  }, []);

  useEffect(() => {
    const bet365DataToday = bet365Data(todayData);
    setRowData(bet365DataToday);

    const bet365DataFull = bet365Data(data);
    setDataToday(bet365DataToday); // setUseNewData -> setDataToday
    setDataFull(bet365DataFull); // setNewData -> setDataFull

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
  }, []);

  const onCellClicked = (params) => {
    console.log("onCellClicked");
    const { data, value, column, api } = params;
    console.log("sec " + JSON.stringify(data));
    setSelectedRow(data);
    setTopRow(data); // Tıklanan satırı en üstteki satır olarak ayarla

    if (column.colDef.filter) {
      api.setColumnFilterModel(column.colDef.field, {
        type: 'equals',
        filter: value,
        filterType: 'text'
      });

      api.onFilterChanged();
    }
  };

  const onFilterChanged = useCallback(() => {
    console.log("onFilterChanged");
    if (gridRef.current) {
      const filterModel = gridRef.current.api.getFilterModel(); // Filtre modelini al

      // Eğer filtre varsa, filtrelenmiş verileri elde et
      if (Object.keys(filterModel).length > 0) {
        // Filtrelenmiş verileri yeni bir diziye atayarak güncelle
        const newFilteredData = dataFull.filter(row => {
          // Her bir filtre için veriyi filtrele
          return Object.keys(filterModel).every(field => {
            const filterValue = filterModel[field].filter.toString().replace(/,/g, '.');; // Filtre değerini al
            // Veri üzerinde filtreleme yap
            return row[field].toString().toLowerCase().includes(filterValue.toString().toLowerCase());
          });
        });
        
        // Tıklanan satırı her zaman en üste ekle, ancak eğer zaten filtrelenmiş veride varsa eklemeyin
        if (selectedRow && !newFilteredData.includes(selectedRow)) {
          newFilteredData.unshift(selectedRow);
        }
        setRowData(newFilteredData); // Filtrelenmiş verileri güncelle
      } else {
        // Eğer filtre yoksa, tüm verileri göster
        setRowData(dataToday);
      }
    }
  }, [gridRef.current, dataFull, dataToday, selectedRow]);

  const clearFilters = useCallback(() => {
    gridRef.current.api.setFilterModel(null);
    setTopRow(null);
  });

  const clearFilter = useCallback((field) => {
    gridRef.current.api.getFilterInstance(field).resetFilter();
    gridRef.current.api.onFilterChanged();
  }, []);

  // set background colour on even rows again, this looks bad, should be using CSS classes
  const getRowStyle = params => {
    if (params.node.data === topRow) {
      return { background: '#ffcc00', fontWeight: 'bold' }; // En üstteki satırı vurgulamak için stil ekle
    } else if (params.node.rowIndex % 2 === 0) {
      return { background: '#f2f2f2' };
    }
  };

  const getRowStyleDark = params => {
    if (params.node.data === topRow) {
      return { background: '#ffcc00', fontWeight: 'bold', color: '#000' }; // En üstteki satırı vurgulamak için stil ekle
    }
  };


  return (
    <div style={containerStyle}>
      <div
        style={gridStyle}
        className={
          currentTheme === "dark" ? "ag-theme-quartz-dark" : "ag-theme-quartz"
        }
      >
        <button onClick={clearFilters}>Filtreleri Temizle</button>
        <AgGridReact
          ref={gridRef}
          getRowStyle={currentTheme === "light" ? getRowStyle : getRowStyleDark}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          //rowClassRules={rowClassRules}
          rowSelection='single'
          pagination={true}
          paginationPageSize={500}
          paginationPageSizeSelector={paginationPageSizeSelector}
          onCellDoubleClicked={onCellClicked}
          localeText={AG_GRID_LOCALE_ZZZ}
          onFilterChanged={onFilterChanged}
        />
      </div>
    </div>
  );
};

export default Table;