const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

function parseApiError(error, data) {
  if (data?.errors && Array.isArray(data.errors) && data.errors.length > 0) {
    return {
      message: data.message || "Validation failed",
      errors: data.errors,
      fieldErrors: data.errors.reduce((acc, curr) => {
        if (curr.field) acc[curr.field] = curr.message;
        return acc;
      }, {}),
    };
  }

  if (data?.message) {
    return {
      message: data.message,
      errors: [],
      fieldErrors: {},
    };
  }

  return {
    message: error?.message || "An unexpected network or server error occurred",
    errors: [],
    fieldErrors: {},
  };
}

export async function createRequirement(payload) {
  const primaryUrl = `${BASE_URL}/api/requirements`;
  const fallbackUrl = `${BASE_URL}/api/v1/requirements`;

  try {
    let response = await fetch(primaryUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.status === 404) {
      response = await fetch(fallbackUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    }

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const parsedError = parseApiError(new Error("Request failed"), data);
      const error = new Error(parsedError.message);
      error.details = parsedError;
      error.statusCode = response.status;
      throw error;
    }

    return data;
  } catch (err) {
    if (err.details) throw err;

    const friendlyError = new Error(
      "Unable to connect to the backend server. Please verify the backend is running on port 8080."
    );
    friendlyError.details = {
      message: "Server unreachable or connection refused",
      errors: [],
      fieldErrors: {},
    };
    throw friendlyError;
  }
}

export async function getRequirements(category = "") {
  try {
    const url = new URL(`${BASE_URL}/api/requirements`);
    if (category) url.searchParams.set("category", category);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch requirements (HTTP ${response.status})`);
    }

    const data = await response.json();
    return data?.data || [];
  } catch (err) {
    console.error("Error fetching requirements:", err);
    return [];
  }
}

export async function getRequirementById(id) {
  try {
    const response = await fetch(`${BASE_URL}/api/requirements/${id}`, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Requirement not found (HTTP ${response.status})`);
    }

    const data = await response.json();
    return data?.data || null;
  } catch (err) {
    console.error(`Error fetching requirement ${id}:`, err);
    return null;
  }
}

export async function checkHealth() {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(`${BASE_URL}/api/health`, {
      method: "GET",
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json().catch(() => ({}));
      return { healthy: true, ...data };
    }
    return { healthy: false };
  } catch {
    return { healthy: false };
  }
}
