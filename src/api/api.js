import * as axios from "axios";

export const instance = axios.create({
  baseURL: "https://e-commerce-shop-back.herokuapp.com/api/",
  // withCredentials: true,
  headers: {}
});

export const productsItemAPI = {
  async fetchProducts(categoryId, subCategoryId, page, sortOrder) {
    const res = await instance.get("item", {
      params: {
        limit: 12,
        page,
        category: categoryId,
        subCategory: subCategoryId,
        sort: "price",
        sortOrder
      }
    });
    return res.data;
  },

  async deleteProduct(id, categoryId, subCategoryId, page, sortOrder) {
    const res = await instance.delete(
      `item/single?id=${id}`,
      categoryId,
      subCategoryId,
      page,
      sortOrder
    );
    return res.data;
  },

  async fetchPopularProducts() {
    const res = await instance.get(`item?isPopular=${true}`);
    return res.data;
  },

  async addToTopSales(id, newData) {
    const res = await instance.put(`item/single?id=${id}`, newData);
    return res.data;
  }
};
