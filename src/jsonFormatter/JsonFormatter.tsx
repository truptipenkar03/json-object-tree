import React, {useCallback, useState} from 'react';

import { JSONTree } from "react-json-tree";

const JsonTheme = {
    scheme: 'monokai',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#a6e22e',
    base0C: '#a1efe4',
    base0D: '#66d9ef',
    base0E: '#ae81ff',
    base0F: '#cc6633'
}

const defaultData = {
    "id": "0001",
    "type": "donut",
    "name": "Cake",
    "ppu": 0.55,
    "batters": {
        "batter":
            [
                {"id": "1001", "type": "Regular"},
                {"id": "1002", "type": "Chocolate"},
                {"id": "1003", "type": "Blueberry"},
                {"id": "1004", "type": "Devil's Food"}
            ]
    },
    "topping": [
        {"id": "5001", "type": "None"},
        {"id": "5002", "type": "Glazed"},
        {"id": "5005", "type": "Sugar"},
        {"id": "5007", "type": "Powdered Sugar"},
        {"id": "5006", "type": "Chocolate with Sprinkles"},
        {"id": "5003", "type": "Chocolate"},
        {"id": "5004", "type": "Maple"}
    ]
};

export const JsonFormatter: React.FC = () => {
    const [jsonData, setJsonData] = useState<Record<string, unknown> | undefined>(defaultData);
    const [rawData, setRawData] = useState(JSON.stringify(defaultData, undefined, 2));

    const handleFormatJson = useCallback(() => {
        try {
            const parsedValue = JSON.parse(rawData);
            setJsonData(parsedValue);
        } catch (ex) {
            setJsonData(undefined);
        }
    }, [setJsonData, rawData]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setRawData(e.target.value);
    }, [setRawData]);

    return (
        <>
            <div
                style={{
                    margin: '20px',
                    fontSize: '24px',
                    textAlign: 'left',
                    fontWeight: 'bold'
                }}
            >
                JSON Formatter
            </div>

            <div
                style={{
                    display: 'flex',
                    margin: '20px',
                    alignItems: 'center'
                }}
            >
                <textarea
                    cols={200}
                    rows={50}
                    style={{ resize: 'none', padding: '20px' }}
                    value={rawData}
                    onChange={handleChange}
                    placeholder="Type/paste any JSON string here"
                />

                <input
                    type="button"
                    name="formatJson"
                    onClick={handleFormatJson}
                    value="Format JSON"
                    style={{
                        width: '120px',
                        height: '40px',
                        fontSize: '16px'
                    }}
                />

                <div
                    style={{
                        border: '1px solid black',
                        width: '100%',
                        height: '780px',
                        textAlign: 'left',
                        padding: '20px'
                    }}
                >
                    {
                        jsonData
                        ? <JSONTree
                            data={jsonData}
                            theme={JsonTheme}
                            invertTheme
                        />
                        : 'Please enter valid JSON'
                    }
                </div>
            </div>
        </>
    );
}
