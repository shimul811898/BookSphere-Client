export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/**
 * Fetch books from Express server
 */
export async function getBooks({ search = "", category = "", sort = "", page = 1, limit = 20 } = {}) {
  try {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (category && category !== "All") params.append("category", category);
    if (sort) params.append("sort", sort);
    if (page) params.append("page", String(page));
    if (limit) params.append("limit", String(limit));

    const res = await fetch(`${API_BASE_URL}/api/books?${params.toString()}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch books: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("API Error in getBooks:", error);
    return { success: false, data: [], error: error.message };
  }
}

/**
 * Fetch featured books for home showcase
 */
export async function getFeaturedBooks() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/books/featured`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch featured books: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("API Error in getFeaturedBooks:", error);
    return { success: false, data: [] };
  }
}

/**
 * Fetch distinct book categories
 */
export async function getCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/books/categories`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("API Error in getCategories:", error);
    return { success: false, data: ["Fiction", "Programming", "Self-Help", "Sci-Fi", "History"] };
  }
}

/**
 * Fetch a single book by ID
 */
export async function getBookById(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/books/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch book: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("API Error in getBookById:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Add a new book
 */
export async function createBook(bookData) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookData),
    });

    return await res.json();
  } catch (error) {
    console.error("API Error in createBook:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Update an existing book
 */
export async function updateBook(id, bookData) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bookData),
    });

    return await res.json();
  } catch (error) {
    console.error("API Error in updateBook:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Delete a book
 */
export async function deleteBook(id) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/books/${id}`, {
      method: "DELETE",
    });

    return await res.json();
  } catch (error) {
    console.error("API Error in deleteBook:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Fetch statistics
 */
export async function getStats() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/books/stats`, {
      cache: "no-store",
    });

    return await res.json();
  } catch (error) {
    console.error("API Error in getStats:", error);
    return { success: false, data: { totalBooks: 0, totalCategories: 0 } };
  }
}
