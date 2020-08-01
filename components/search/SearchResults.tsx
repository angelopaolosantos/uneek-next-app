import { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client';
import withApollo from '../../contexts/apollo/withApollo'
import _ from 'lodash'
import { Placeholder, Pagination } from 'rsuite'

const { Paragraph } = Placeholder

const SearchResults = (props) => {
    const keywords = _.trim(props.keywords)

    if (keywords != "" && keywords.length > 3) {
        console.log(keywords)

        const QUERY = gql`
            query SearchProducts($search: String, $limit: Int, $page: Int) {
            products(search: $search, limit: $limit, page: $page){
                thumbnail
                sku
                name
                price
                images
            },
            productsCount(search: $search) {
                count
            }
        }
        `;

        const { loading, error, data } = useQuery(QUERY, {
            variables: { search: keywords, limit: props.limit, page: props.currentPage }
        })

        if (loading) {
            return (
                <div className="products-block">
                    <div className="placeholder"><Paragraph graph="image" active rows={5} /></div>
                    <div className="placeholder"><Paragraph graph="image" active rows={5} /></div>
                    <div className="placeholder"><Paragraph graph="image" active rows={5} /></div>

                    <style jsx>{`
                    .products-block {
                        display: grid;
                        grid-template-columns: auto auto auto;
                    }
                    .placeholder {
                        border: 1px solid #d2d2d2;
                        text-align: center;
                        padding: 15px;
                        margin: 5px;test
                    }
                    `}
                    </style>
                </div>
            )
        }

        if (error) {
            return <div>"Error Occured"</div>
        }

        const listProd = data.products.map((product) => {
            return (
                <div className="product">
                    <div><img src={product.images} className="responsive" /></div>
                    <div className="product-name">{product.name}</div>
                    <div className="product-sku">{product.sku}</div>
                    {product.price > 0 &&
                        <div className="product_price">{product.price}</div>
                    }
                    <style jsx>{`
                    .product {
                        border: 1px solid #d2d2d2;
                        text-align: center;
                        padding: 15px;
                        margin: 5px;
                    }

                    .responsive {
                        width: 100%;
                        height: auto;
                    }

                    .product-name {
                        font-size: 1.2em;
                    }
                    .product-sku {
                        font-size: 0.8em;
                    }
                    .product-price {
                        font-size: 1.2em;
                    }
                    `}
                    </style>
                </div>
            )
        })

        const pages = Math.floor(data.productsCount.count / props.limit) 

        return (
            <div>
                <div className="products-block">
                    {listProd}
                    <style jsx>{`
                    .products-block {
                        display: grid;
                        grid-template-columns: auto auto auto;
                    }
                `}
                    </style>
                </div>
                <Pagination prev={true}
      next={true} pages={pages} maxButtons={5} activePage={props.currentPage} onSelect={(page)=>props.setCurrentPage(page)} ellipsis={true}
      boundaryLinks={true} />
            </div>
        )
    } else { // Default content
        return (
            <div></div>
        )
    }
}

export default withApollo(SearchResults)