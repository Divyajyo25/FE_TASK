import React, { useEffect, useState } from "react";
import axios from 'axios';
import styled from "styled-components";

const Percent = styled.div`
  color: ${({ color }) => color};
`;


function convertToInternationalCurrency(labelValue) {
    return Math.abs(Number(labelValue)) >= 1.0e+9
        ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "b"
        : Math.abs(Number(labelValue)) >= 1.0e+6

            ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "m"
            : Math.abs(Number(labelValue)) >= 1.0e+3

                ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "k"
                : Math.abs(Number(labelValue));
}

// function colorChange(value){
//     return Math.abs(Number(value)) <=0
//     ? 
// }


function Table() {

    const [titles, setTitle] = useState()

    useEffect(() => {
        axios.get(`https://api.coincap.io/v2/assets`)
            .then((data) => {
                setTitle(data.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    console.log(titles)

    const handleColors = (value) => {
        if (value > 0) return "green";
        if (value < 0) return "red";
        return "orange";
      };

    return (
        <div className="bg">
            <div className="mainTable">
                <table class="table" className="mytable">
                    <thead>
                        <tr>
                            <th className="rank1">Rank</th>
                            <th className="name1">Name</th>
                            <th className="price1">Price</th>
                            <th className="marketCap1">Market cap</th>
                            <th className="vwap1">VWAP(24Hr)</th>
                            <th className="supply1">Supply</th>
                            <th className="volume1">Volume(24Hr)</th>
                            <th className="change1">Change(24Hr)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {titles && titles
                        .slice(0,50)
                        .map((item) =>
                        (
                            <tr className="data">
                                <th scope="row" className="rank">{item.rank}</th>
                                <td key={item.id} value={item.id} className="name"><img className="image" src={`https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}%402x.png`}></img> {item.name}</td>
                                <td className="price">${Number(item.priceUsd).toFixed(2)}</td>
                                <td className="marketCap">${convertToInternationalCurrency(Number(item.marketCapUsd))}</td>
                                <td className="vwap">${Number(item.vwap24Hr).toFixed(2)}</td>
                                <td className="supply">{convertToInternationalCurrency(Number(item.supply))}</td>
                                <td className="volume">{convertToInternationalCurrency(Number(item.volumeUsd24Hr))}</td>
                                <Percent color={handleColors(Number(item.changePercent24Hr).toFixed(2))}><td className="change">{Number(item.changePercent24Hr).toFixed(2)}%</td></Percent>
                            </tr>
                        ))}
                        <tr className="lastrow">
                            <th></th>
                            <th></th>
                            <th></th>
                            <button className="viewmore">View More</button>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table