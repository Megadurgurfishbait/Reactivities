import React, { useContext, useState } from "react";
import { Tab, Header, Card, Image, Button, Grid } from "semantic-ui-react";
import { RootStoreContext } from "../../App/stores/rootStore";
import { PhotoUploadWidget } from "../../App/Common/photoUpload/PhotoUploadWidget";
import { observer } from "mobx-react-lite";

const ProfilePhotos = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    profile,
    isCurrentUser,
    uploadPhoto,
    uploadingPhoto,
    setMainPhoto,
    loading,
    deletePhoto
  } = rootStore.profileStore;
  const [addPhotoMode, setAddPhotoMode] = useState(true);
  const [target, setTarget] = useState<String | undefined>(undefined);

  const handleUploadImage = (photo: Blob) => {
    uploadPhoto(photo).then(() => setAddPhotoMode(false));
  };

  return (
    <Tab.Pane>
      <Grid>
        <Grid.Column width={16} style={{ paddingBottom: 0 }}>
          <Header floated='left' icon='image' content='photos' />
          {isCurrentUser && (
            <Button
              floated='right'
              basic
              content={addPhotoMode ? "Cancel" : "Add Photo"}
              onClick={() => setAddPhotoMode(!addPhotoMode)}
            />
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          {addPhotoMode ? (
            <PhotoUploadWidget uploadPhoto={handleUploadImage} loading={uploadingPhoto} />
          ) : (
            <Card.Group itemsPerRow={5}>
              {profile &&
                profile?.photos.map(photo => (
                  <Card key={photo.id}>
                    {console.log(photo)}
                    <Image src={photo.url} />
                    {isCurrentUser && (
                      <Button.Group fluid widths={2}>
                        <Button
                          name={`${photo.id}/Main`}
                          loading={loading && target === `${photo.id}/Main`}
                          disabled={photo.isMain}
                          basic
                          positive
                          content='Main'
                          onClick={e => {
                            setTarget(e.currentTarget.name);
                            setMainPhoto(photo);
                          }}
                        />
                        <Button
                          loading={loading && target === `${photo.id}/delete`}
                          name={`${photo.id}/delete`}
                          basic
                          disabled={photo.isMain}
                          negative
                          icon='trash'
                          onClick={e => {
                            setTarget(e.currentTarget.name);
                            deletePhoto(photo);
                          }}
                        />
                      </Button.Group>
                    )}
                  </Card>
                ))}
            </Card.Group>
          )}
        </Grid.Column>
      </Grid>
    </Tab.Pane>
  );
};

export default observer(ProfilePhotos);
