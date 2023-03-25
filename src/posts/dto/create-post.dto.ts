export class CreatePostDto {
  readonly title: string;

  readonly content: string;

  // TODO get it from token, not from dto.
  readonly userId: number;
}
