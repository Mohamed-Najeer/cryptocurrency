import React from 'react';

export class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            postId: [],
            day_7: [],
            hour_24: [],
            day_7_color: [],
            day_7_font: [],
            hour_24_color: [],
            hour_24_font: [],
            imgdata: []
        };
    }
    componentDidMount = () => {
        // setInterval(() => {
            fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=c9efbfb9-a9b1-4c5a-9b38-017900c90e27')
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        isLoaded: true,
                        postId: json.data,
                        day_7: json.data.map(dayval => dayval.quote.USD.percent_change_7d),
                        hour_24: json.data.map(hourval => hourval.quote.USD.percent_change_24h),
                    })
                    this.setState({ day_7_color: "", day_7_font: "" })
                    this.setState({ hour_24_color: "", hour_24_font: "" })
                    this.state.day_7.forEach((element, i) =>
                        this.state.day_7[i] > 0 ? this.setState({ day_7_color: [...this.state.day_7_color, "#16c784"], day_7_font: [...this.state.day_7_font, "fa fa-caret-up"] })
                            :
                            this.setState({ day_7_color: [...this.state.day_7_color, "#ea3943"], day_7_font: [...this.state.day_7_font, "fa fa-caret-down"] })
                    )
                    this.state.hour_24.forEach((element, i) =>
                        this.state.hour_24[i] > 0 ? this.setState({ hour_24_color: [...this.state.hour_24_color, "#16c784"], hour_24_font: [...this.state.hour_24_font, "fa fa-caret-up"] })
                            :
                            this.setState({ hour_24_color: [...this.state.hour_24_color, "#ea3943"], hour_24_font: [...this.state.hour_24_font, "fa fa-caret-down"] })
                    )
                });
            fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=BTC')
                .then(res => res.json())
                .then(json => {
                    this.setState({
                        imgdata: json
                    })
                });
        // }, 5000);
    }
    render() {
        const { isLoaded, postId } = this.state;
        if (!isLoaded) {
            return <div>loading...</div>
        }
        else {
            return (
                <div id="table-scroll" className="table-scroll">
                    <table id="main-table" class="main-table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">24h</th>
                                <th scope="col">7d</th>
                                <th scope="col">Market Cap</th>
                                <th scope="col">Volume</th>
                                <th scope="col">Circulating Supply</th>
                            </tr>
                        </thead>
                        <tbody>
                            {postId.map((postval, i) => (
                                <tr>
                                    <th>{postval.cmc_rank}</th>
                                    <td><img className="hm mr-3" src={this.state.imgdata[i].image} width="8%" />{postval.name + " "}<span className="symbol">{postval.symbol}</span></td>
                                    <td className="text-right">${((postval.quote.USD.price).toString().substring(0, (postval.quote.USD.price).toString().indexOf('.') + 3)).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td style={{ color: this.state.day_7_color[i] }}>
                                        <i className={this.state.day_7_font[i]}
                                            style={{ color: this.state.day_7_color[i] }}>&nbsp;&nbsp;
                                            {
                                                (postval.quote.USD.percent_change_24h).toString().substring(0, (postval.quote.USD.percent_change_24h).toString().indexOf('.') + 3)}
                                        </i> </td>
                                    <td style={{ color: this.state.hour_24_color[i] }}>
                                        <i className={this.state.hour_24_font[i]}
                                            style={{ color: this.state.hour_24_color[i] }}>&nbsp;&nbsp;
                                            {
                                                (postval.quote.USD.percent_change_7d).toString().substring(0, (postval.quote.USD.percent_change_7d).toString().indexOf('.') + 3)
                                            }
                                        </i>
                                    </td>
                                    <td  className="text-right">${(postval.quote.USD.market_cap).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td  className="text-right">${(postval.quote.USD.volume_24h).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</td>
                                    <td>{(postval.circulating_supply).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}