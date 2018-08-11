import React from 'react'

const BOX_SIZE = 27;

export const COLORS = [
    "#ffffff",
    "#ea2954",
    "#62c462",
    "#0086fe",
    "#c2a878",
    "#5bc0de",
    "#ffc300",
    "#b118c8",
];

export const DEFAULT_COLOR = COLORS[0];

export default ({colors = COLORS, value, onChangeValue}) => <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-between", marginBottom: 10}}>
    {colors.map((c, idx) =>
        <div key={c} style={{cursor: "pointer"}} onClick={() => onChangeValue(c)}>
            <div style={{
                border: c == value ? "3px solid white" : "3px solid transparent",
                borderRadius: 5,
                padding: 4,
                marginLeft: (idx > 0 ? -6 : 0)

            }}>
                <div style={{backgroundColor: c, height: BOX_SIZE, width: BOX_SIZE, borderRadius: 2}}/>
            </div>
        </div>
    )}
</div>;

