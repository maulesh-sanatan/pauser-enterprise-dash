// components/QRCodeGenerator.js

import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ url }) => {
    return <QRCode value={url} />;
};

export default QRCodeGenerator;
