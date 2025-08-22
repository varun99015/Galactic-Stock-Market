import { useParams } from 'react-router-dom';
import { spaceStocks } from '../constants/FX_1';
import FXSTOCK2 from './FXSTOCK2';
import FXSTOCK3 from './FXSTOCK3';
import FXSTOCK1 from './FXSTOCK1';
import FXSTOCK4 from './FXSTOCK4';
import FXSTOCK5 from './FXSTOCK5';
import { Stocks } from '../constants/DiffStocks';
import { satelliteStocks } from '../constants/FX_2';
import { spaceFinanceStocks } from '../constants/FX_3';
import { miningStocks } from '../constants/FX_4';
import { colonizationStocks } from '../constants/FX_5';


const DynamicStock = () => {
  const { type, symbol } = useParams();
  const decodedType = decodeURIComponent(type);
  const decodedSymbol = decodeURIComponent(symbol);
  const stockType = Stocks.find(t =>t.name === decodedType);
   let  stock = null;
  if(!stockType)return <div className="text-red-500 p-8">Stock Type {type} not found: {decodedSymbol}</div>;

  switch (decodedType) {
    case 'spaceStocks':
       stock = spaceStocks.find(s => s.symbol === decodedSymbol);
       if(stock) return <FXSTOCK1 stock={stock} />;
      break;    
    case 'satelliteStocks':
       stock = satelliteStocks.find(s => s.symbol === decodedSymbol);
       if(stock) return <FXSTOCK2 stock={stock} />;
    break;
    case 'spaceFinanceStocks':
      stock = spaceFinanceStocks.find(s => s.symbol === decodedSymbol);
      if(stock) return <FXSTOCK3 stock={stock} />;
    break;
    case 'miningStocks':
      stock = miningStocks.find(s => s.symbol === decodedSymbol);
      if(stock) return <FXSTOCK4 stock={stock} />;
    break;
    case 'colonizationStocks':
      stock = colonizationStocks.find(s => s.symbol === decodedSymbol);
      if(stock) return <FXSTOCK5 stock={stock} />;
    break;
  }
 // 
  if (!stock) return <div className="text-red-500 p-8">Stock not found: {decodedSymbol}</div>;

};

export default DynamicStock;
