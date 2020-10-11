import * as React from 'react';
import { SvgXml } from 'react-native-svg';
import BarcodeScan from '../../assets/svg/barcode-scanner.svg';

export default function ScanButton(){
    return(
        <SvgXml width="50" height="50" xml={BarcodeScan} />
    )
} 