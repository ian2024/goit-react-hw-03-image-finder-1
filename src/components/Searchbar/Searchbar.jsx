import { Component } from "react";
import { HiOutlineSearch } from 'react-icons/hi';

export class Searchbar extends Component {
    state = {
        searchQuery: '',
    };

    handleInput = e => {
        this.setState({ searchQuery: e.currentTarget.value.toLowerCase().trim() });
    };

    handleSubmit = e => {
        e.preventDefault();

        if (this.state.searchQuery === '') {
            return;
        }
        this.props.onSubmit(this.state.searchQuery);
        this.setState({ searchQuery: '' });
    };

    render() {
        return (
            <header className="Searchbar">
                <form className="SearchForm" onSubmit={this.handleSubmit}>
                    <button
                        type="submit"
                        className="SearchForm-button"
                        aria-label="search"
                    >
                        <HiOutlineSearch style={{ width: 20, height: 20 }} />
                    </button>

                    <input
                        className="SearchForm-input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.handleInput}
                    />
                </form>
            </header>
        );
    }
}