## Global styles for overriding components styles.

Menormalkan grid system ant design.

Implemented to :
- src\containers\CandidatePool\PersonalData.js
- src\containers\ListOfApplicant\PersonalData.js


## Penggunaan

- import global styles.
```jsx
import '../../styles/globalStyles.scss'
```

- Hapus dan tambah property baru. 
> Grid `<Col>` hanya boleh berada di 1 parent `<Row>`

> more info https://3x.ant.design/components/grid/

```jsx
<Col xs={24}>
    <Input
        labelField="Gender"
        name="gender"
        id="gender"
        initialValue={Applicant.PersonalData.Gender}
        getFieldDecorator={getFieldDecorator}
        Form={Form}
        onChange={() => {}}
        onSubmit={onSubmit}
        disabled={true}
        width="100%"
        className="InputWrapper"
    />
</Col>
```


- Prop tambahan
```jsx
<Col xs={24}>
    <Input
        ...
        width="100%"
        className="InputWrapper"
    />
</Col>
```


- Prop tambahan
```jsx
<Col xs={24}>
    <Input
        ...
        width="100%"
        className="InputWrapper"
    />
</Col>
```

**Hapus Property `formItemLayout={formItemLayoutSelect}`**