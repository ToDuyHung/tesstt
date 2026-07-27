# MSAL React SSO Login Test

Dự án Frontend tối giản này dùng để test tính năng đăng nhập SSO với Azure AD bằng thư viện `@azure/msal-react` (đoạn code của bạn).

## Yêu cầu (Prerequisites)

1. Mở file `src/authConfig.ts` và thay thế `CLIENT_ID` cùng với `TENANT_ID` bằng ID thực tế trên Azure Portal của bạn.
2. Đảm bảo App Registration trên Azure Portal được cấu hình dạng **Single-page application (SPA)**.
3. Trong ô Redirect URIs trên Azure Portal, bắt buộc thêm `http://localhost:3000`.
4. Nhớ tích chọn ô **ID tokens** trong mục Implicit grant and hybrid flows.

## Cài đặt thư viện

Bạn copy source code này sang máy khác, mở terminal tại thư mục này và chạy:

```bash
npm install
```

## Chạy Server Test

Sau khi cài xong, chạy lệnh sau để khởi động Frontend:

```bash
npm run dev
```

Server sẽ chạy ở địa chỉ `http://localhost:3000`. Mở trình duyệt, bấm vào nút **Đăng nhập với Microsoft**, sau đó bật tab F12 Console lên để xem log trả về nhé!
