import styled from "styled-components";
import { Input, inputFactory } from "../../libs/input-factory";
import { useUnit } from "effector-react";
import { ScreenLayout } from "./shared";
import { $projects, putProjectFx, createProjectFx, deleteProjectFx, deleteFileFx, uploadFileFx } from "../../entity/project";

const nameInputs = {} as Record<string, ReturnType<typeof inputFactory<any>>>;

$projects.watch((state) => {
  if (state.length !== 0) {
    state.forEach((project) => {
      const input = inputFactory(project.name);
      input.onChange.watch((value) => {
        putProjectFx({ id: project.id, name: value });
      });
      nameInputs[project.id] = input;
    });
  }
});

export function Projects() {
  const projects = useUnit($projects);

  return (
    <ScreenLayout title="Проекты" direction="column" gap={20}>
      <AddNewProject
        onClick={() => {
          createProjectFx({ name: "Без имени", description: "Без описания" });
        }}
      >
        + Добавить новый проект
      </AddNewProject>
      <ProjectList>
        {projects.map((project) => {
          return (
            <Project key={project.id}>
              <ProjectHeader>
                <ProjectTitle>
                  <Input inputModel={nameInputs[project.id]} />
                </ProjectTitle>
                <ProjectDelete onClick={() => deleteProjectFx({ id: project.id })}>Удалить</ProjectDelete>
              </ProjectHeader>
              {/* <div>{project.id}</div> */}
              <ProjectPhotos>
                {project.photos.map((s) => {
                  return (
                    <div key={s.id}>
                      <span onClick={() => deleteFileFx(s.id)}>x</span>
                      <img src={s.location} />
                    </div>
                  );
                })}
                <input
                  type="file"
                  multiple
                  onChange={(e) => {
                    uploadFileFx({ files: Array.from(e.target.files!), relationId: project.id });
                    e.target.value = "";
                  }}
                />
              </ProjectPhotos>
            </Project>
          );
        })}
      </ProjectList>
    </ScreenLayout>
  );
}

const ProjectList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Project = styled.div`
  padding: 40px;
  border: 2px solid #ddd;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ProjectTitle = styled.div`
  input {
    font-size: 26px;
    font-weight: 600;
    border: 0;
    border-bottom: 1px solid #ddd;
  }
`;
const ProjectDelete = styled.button``;

const ProjectPhotos = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  background-color: #eee;
  flex-wrap: wrap;
  > div {
    position: relative;
    > span {
      position: absolute;
      top: 0;
      background: #f00;
      padding: 5px;
      color: #fff;
    }
    > img {
      max-width: 100px;
      height: 100px;
      object-fit: cover;
    }
  }
`;

const AddNewProject = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: green;
  width: 100%;
  border: 2px solid;
  border-radius: 8px;
`;
