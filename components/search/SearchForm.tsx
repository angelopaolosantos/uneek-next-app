import { InputGroup, Input, Icon, Form } from 'rsuite'
import { useState } from 'react'

const SearchForm = (props) => {
    const [formValue, setformValue] = useState('')

    function handleSubmit() {
        props.setCurrentPage(1)
        props.setKeywords(formValue)
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <InputGroup>
                    <Input name="keyword" placeholder="Enter Keywords Here" onChange={(formValue)=>setformValue(formValue)} />
                    <InputGroup.Button onClick={handleSubmit} >
                        <Icon icon="search" />
                    </InputGroup.Button>
                </InputGroup>
            </Form>
        </div>
    )
}

export default SearchForm