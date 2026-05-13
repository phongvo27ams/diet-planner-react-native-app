# Diet Planner

## Tạo một project mới

```
npx create-expo-app@3.3.0
```

- Reset project, chọn "n" để reset project:

```
npm run reset-project
```

- Đổi tên nhánh master và push code:

```
git branch -m master main
git remote add origin https://github.com/phongvo27ams/diet-planner-react-native-app.git
git push -u origin main
```

## Chạy project

- Chạy ứng dụng chính:

```
npx expo start -c
```

- Chạy server Convex:

```
npx convex dev
```

## Publish project trên Expo

```
npx expo login --sso
npx expo start -c
npm cache clean --force
npm uninstall -g eas-cli
npm install -g eas-cli
eas init
eas update
```