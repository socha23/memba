import React from 'react'
import {compose, withPropsOnChange} from 'recompose'
import {Link, withRouter} from 'react-router-dom'
import queryString from 'query-string'

const propsWithQuery = withPropsOnChange(
    ['location', 'match'],
    ({location, match}) => {
        return {
            location: {
                ...location,
                query: queryString.parse(location.search)
            },
            match
        };
    }
);

export const withRouterWithQuery = compose(withRouter, propsWithQuery);

export const LinkWithQuery = (params) => {
    const to = params.to;
    const search = params.query ? ("?" + queryString.stringify(params.query)) : "";
    
    var newTo = {};
    if (typeof to === 'object') {
        newTo = {
            ...to,
            search: search
        }
    } else {
        newTo = {
            pathname: params.to,
            search: search
        }
    }
    return <Link  {...params} to={newTo}>{params.children}</Link>
};

export const encodeQuery = (path, query = {}) => (path + "?" + queryString.stringify(query));


