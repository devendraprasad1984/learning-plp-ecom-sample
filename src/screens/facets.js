import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import useAPI from "../hooks/useAPI";
import NoData from "../components/common/nodata";
import {config} from "../configs/config";
import '../css/facets.css'
import {sortByField} from "../configs/utils";
import Input from "../components/common/input";
import {connect} from 'react-redux'
import Button from "../components/common/button";
import Types from "../redux/types";

const Facets = props => {
    const {title, handleLeftPane} = props
    const [facetsList, setFacetsList] = useState([])
    const [currentFilter, setCurrentFilter] = useState({
        [config.app_enums.gender]: [],
        [config.app_enums.price]: [],
        [config.app_enums.color]: []
    })
    const {data, loading, error} = useAPI(config.endpoints.FACETS)

    useEffect(() => {
        if (data === undefined) return
        setFacetsList(sortByField(data, config.app_enums.position))
    }, [loading])

    const handleCheckChange = (e) => {
        const keyval = e.target.getAttribute(config.app_enums.keyval)
        const keyValArr = keyval.split(':')
        const key = keyValArr[0].toLowerCase()
        const val = keyValArr[1].toLowerCase()
        const checked = e.target.checked
        let tmp = {...currentFilter}
        if (checked) {
            tmp[key].push(val)
        } else {
            tmp[key] = tmp[key].filter(it => it !== val)
        }
        setCurrentFilter({...tmp})
    }

    const displayValueArray = (name, values) => {
        if (values.length === 0) return
        return values.map((item, index) => {
            return <div key={'item-' + index}>
                <Input type='checkbox' label={item}
                       keyval={name + ':' + item} onChange={handleCheckChange}
                />
            </div>
        })
    }
    const displayValueObject = (name, {counts}) => {
        if (counts.length === 0) return
        let countStringFilter = counts.filter(cnt => typeof cnt === 'string')
        let countIntegerFilter = counts.filter(cnt => typeof cnt !== 'string')
        return countStringFilter.map((item, index) => {
            let endStr = ' - ' + config.chars.doller
            let keyValEndStr = item
            if (index < countStringFilter.length - 1) {
                endStr += config.dp2(countStringFilter[index + 1] - 1)
                keyValEndStr += '-' + (countStringFilter[index + 1] - 1)
            } else {
                endStr = '+'
            }
            return <div key={'price-item-' + index}>
                <Input type='checkbox'
                       label={config.chars.doller + config.dp2(item) + endStr + ' (' + countIntegerFilter[index] + ')'}
                       keyval={name + ':' + keyValEndStr} onChange={handleCheckChange}
                />
            </div>
        })
    }

    const displayFacets = () => {
        if (facetsList.length === 0) return
        return facetsList.map((facet, index) => {
            const {facetId, name, position, values, gap, start, end} = facet
            return <div key={'prod-item-' + facetId}>
                <div className='bg-title pad10'>{name}</div>
                {Array.isArray(values) ? displayValueArray(name, values) : displayValueObject(name, values)}
            </div>
        })
    }

    const handleFilter = () => {
        props.applyFilter(currentFilter)
    }
    const handleReset = () => {
        props.applyFilter(null)
    }

    if (loading || (error !== undefined && error !== null)) return <NoData/>
    return <div className='column'>
        <div className='row'>
            <span>{title}</span>
            <span className='right'>
                <a onClick={handleLeftPane}>{config.chars.close}</a>
            </span>
        </div>
        <div className='box'>{displayFacets()}</div>
        <div className='margin-ud'>
            <Button val='Apply' click={handleFilter} btnClass='green'/>
            <Button val='Reset' click={handleReset} btnClass='red'/>
        </div>
    </div>
}

Facets.propTypes = {
    title: PropTypes.string.isRequired,
    handleLeftPane: PropTypes.func
}

const mapDispatchToProps = dispatch => {
    return {
        applyFilter: (payload) => dispatch(Types().setFilterToStore(payload))
    }
}
export default React.memo(connect(null, mapDispatchToProps)(Facets))

