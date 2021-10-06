import React, {useCallback, useEffect, useState} from "react";
import {useHistory} from 'react-router-dom'
import PropTypes from "prop-types";
import useAPI from "../hooks/useAPI";
import NoData from "../components/common/nodata";
import {config} from "../configs/config";
import '../css/products.css'
import Image from "../components/common/img";
import {sortByField} from "../configs/utils";
import {connect} from "react-redux";

const Products = props => {
    const {filters} = props

    const history = useHistory()
    const [productList, setProductList] = useState([])

    const {data, loading, error} = useAPI(config.endpoints.CATALOG)
    useEffect(() => {
        if (data === undefined) return
        setProductList(sortByField(data, config.app_enums.price))
    }, [loading])

    const navigateToProductDetailPage = (id) => {
        const to = `${config.navigate.productDetail}/${id}`
        // window.open(to,'_blank')
        history.push(to)
    }

    const displayProductList =useCallback(() => {
        if (productList.length === 0) return
        const _colorFilter = filters[config.app_enums.color] || []
        const _genderFilter = filters[config.app_enums.gender] || []
        const _priceFilter = filters[config.app_enums.price] || []
        const noFilter=_colorFilter.length === 0 && _genderFilter.length === 0 && _priceFilter.length === 0

        return productList.map((prod, index) => {
            const {id, name, imageURL, price, currency, color, gender} = prod
            let canDisplayItem = (_colorFilter.indexOf(color.toLowerCase()) !== -1 || _genderFilter.indexOf(gender.toLowerCase()) !== -1)
            if (!canDisplayItem && !noFilter) return null
            return <div key={'prod-item-' + id} className='grid-item click'
                        onClick={() => navigateToProductDetailPage(id)}>
                <Image className='img-product' src={imageURL}/>
                <span>
                    <h3>{name}</h3>
                    <p>{currency}{price}</p>
                </span>
            </div>
        })
    },[filters])

    if (loading || (error !== undefined && error !== null)) return <NoData/>
    return <div>
        <h2 className='margin-rl'>{props.title}</h2>
        <div className='grid-container'>{displayProductList()}</div>
    </div>
}

Products.propTypes = {
    title: PropTypes.string.isRequired
}
const mapx = (state, ownProps) => {
    return {
        filters: state.filters.filters,
    }
}
export default React.memo(connect(mapx)(Products))

