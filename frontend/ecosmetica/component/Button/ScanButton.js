import * as React from 'react';
import { SvgXml } from 'react-native-svg';
import BarcodeScan from '../../assets/svg/scanner_icon.svg';

export default function ScanButton(){
    return(
        <SvgXml xml={BarcodeScan} />
    )
} 