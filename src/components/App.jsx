import api from '../api/api-service';
import { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Modal } from './Modal/Modal';
import { Loader } from './Loader/Loader';


export class App extends Component {
  state = {
    searchQuery: '',
    images: [],
    page: 1,
    error: null,
    status: 'idle',
    showModal: false,
    selectedImage: null,
  };


  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ status: 'pending' });

      api.fetchImages(nextQuery, nextPage).then(response => {
        const resp = response.hits.map(({ largeImageURL, tags, webformatURL, id }) => {
          return { largeImageURL, tags, webformatURL, id };
        });

        this.setState(prevState => ({
          images: [...prevState.images, ...resp],
          status: 'resolved',
        }));
      })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleSubmit = searchQuery => {
    this.setState({
      searchQuery,
      page: 1,
      images: [],
    });
  };

  handleLMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  toggleModal = async largeImage => {
    await this.setState({ selectedImage: largeImage });
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { images, error, showModal, selectedImage, status } = this.state;
    return (
      <main className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery images={images} toggleModal={this.toggleModal} />
        {images.length > 0 && status !== 'pending' && (
          <Button onLoadMore={this.handleLMore}>Load Mmmoore</Button>
        )}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <p>{error.message}</p>}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={selectedImage} alt="" />
          </Modal>
        )}
      </main>
    );
  };
}
