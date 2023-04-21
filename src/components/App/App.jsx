import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import SearchForm from '../Searchbar/Searchbar';
import { Gallery } from '../ImageGallery/ImageGallery';
import { LoadMoreButton } from '../Button/Button';
import { LoaderSpinner } from '../Loader/Loader';
import { Modal } from '../Modal/Modal';
import { LoadingPage } from './AppStyle';

const API_KEY = '34170895-3b717d95f13cef959b3654060';

export default class App extends Component {
  state = {
    images: null,
    isLoading: false,
    query: '',
    status: 'idle',
    page: 1,
    largeImageURL: '',
    showModal: false,
    loadMore: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      this.setState({ page: 1, images: null, loadMore: false });
      this.fetchImages();
    } else if (prevState.page !== this.state.page) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { query, page } = this.state;

    this.setState({ isLoading: true, status: 'pending' });

    try {
      const response = await axios.get(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );

      const hits = response.data.hits.map(
        ({ id, largeImageURL, webformatURL }) => ({
          id,
          largeImageURL,
          webformatURL,
        })
      );

      if (hits.length === 0) {
        toast.error(`Ups...we have not ${query} images...`);
        this.setState({ images: null, status: 'rejected', loadMore: false });
        return;
      }

      if (page === 1) {
        this.setState({ images: hits, status: 'resolved' });
      } else {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          status: 'resolved',
        }));
      }

      if (response.data.totalHits > page * 12) {
        this.setState({ loadMore: true });
      } else {
        this.setState({ loadMore: false });
      }
    } catch (error) {
      console.log(error);
      this.setState({ status: 'rejected' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  resetState() {
    this.setState({
      isLoading: false,
      status: 'idle',
      page: 1,
      largeImageURL: '',
      showModal: false,
      loadMore: false,
    });
  }

  handleFormSubmit = query => {
    this.setState({ query });
    this.resetState();
  };

  handleLoadMoreClick = () => {
    this.setState({ isLoading: true });
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  handleImageClick = largeImageURL => {
    this.setState({ showModal: true, largeImageURL });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const {
      images,
      isLoading,
      status,
      showModal,
      largeImageURL,
      query,
      loadMore,
    } = this.state;

    if (status === 'idle') {
      return <SearchForm onSubmit={this.handleFormSubmit} value={query} />;
    }

    if (status === 'pending' && images === null) {
      return (
        <>
          <SearchForm onSubmit={this.handleFormSubmit} value={query} />
          <LoadingPage>
            <LoaderSpinner />
          </LoadingPage>
        </>
      );
    }

    if (status === 'rejected') {
      return (
        <div>
          <SearchForm onSubmit={this.handleFormSubmit} value={query} />
          <ToastContainer autoClose={3000} />
        </div>
      );
    }

    return (
      <div>
        <SearchForm onSubmit={this.handleFormSubmit} value={query} />

        {images && (
          <Gallery images={images} onImageClick={this.handleImageClick} />
        )}

        {isLoading && (
          <LoadingPage>
            <LoaderSpinner />
          </LoadingPage>
        )}

        {loadMore && !isLoading && (
          <LoadMoreButton onClick={this.handleLoadMoreClick} />
        )}

        {showModal && (
          <Modal
            onClose={this.handleCloseModal}
            largeImageURL={largeImageURL}
          ></Modal>
        )}
      </div>
    );
  }
}
