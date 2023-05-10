import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Provider from '../screens/Provider';
import Sale from '../screens/Sale';
import Inventory from '../screens/Inventory';
import Product from '../screens/Product';
import PromissoryNotes from '../screens/PromissoryNotes';
import Buy from '../screens/Buy';
import ListProviders from '../screens/ListProviders';
import ListSales from '../screens/ListSales';
import ReportLists from '../screens/ReportList';
import RegisterLists from '../screens/RegisterLists';
import ListBuys from '../screens/ListBuys';
import ListProducts from '../screens/ListProducts';
import ListNotes from '../screens/ListNotes';
import ListInventorys from '../screens/ListInventorys';

const { Navigator, Screen } = createNativeStackNavigator();

export default function AppRoutes() {
    return (
        <Navigator screenOptions={{ headerShown: false }}>
            <Screen name='home' component={Home} />

            {/* Telas de cadastro */}
            <Screen name='provider' component={Provider} />
            <Screen name='sale' component={Sale} />
            <Screen name='inventory' component={Inventory} />
            <Screen name='product' component={Product} />
            <Screen name='note' component={PromissoryNotes} />
            <Screen name='buy' component={Buy} />

            {/* Telas de listagem */}
            <Screen name='report' component={ReportLists} />
            <Screen name='register' component={RegisterLists} />

            {/* Telas de relatórios */}
            <Screen name='providers' component={ListProviders} />
            <Screen name='sales' component={ListSales} />
            <Screen name='products' component={ListProducts} />
            <Screen name='notes' component={ListNotes} />
            <Screen name='buys' component={ListBuys} />
            <Screen name='inventorys' component={ListInventorys} />
        </Navigator>
    )
}